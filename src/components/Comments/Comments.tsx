import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, onSnapshot, doc } from "firebase/firestore";
import { firestore } from '../../firebase';

// Define the structure of comment
type Comment = {
    id: string,
    text: string
}

const Comments = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const docRef = await addDoc(collection(firestore, "comments"), {
            text: newComment
        });
        setNewComment("");
        setComments([{id: docRef.id, text: newComment}, ...comments ]); // Firestore auto-generates id for every document, use it to reference your comments
    };

    useEffect(() => {
        const unsub = onSnapshot(collection(firestore, "comments"), (snapshot) => {
            let fetchedComments: Comment[] = [];
            snapshot.forEach((doc) => {
                fetchedComments.push({ id: doc.id, text: doc.data().text });
            });
            setComments(fetchedComments);
        });

        // Detach the listener on component unmount
        return () => unsub();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(firestore, "comments", id));
    };

    return (
        <div>
            <h2>Comments Section</h2>
            <p>This will allow visitors (like friends and family) to leave messages or comments.</p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newComment}
                    onChange={handleInputChange}
                    placeholder="Add a comment!"
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                {comments.map(comment => (
                    <div key={comment.id}>
                        <p>{comment.text} <button onClick={() => handleDelete(comment.id)}>Delete</button></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;