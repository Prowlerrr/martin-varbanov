import React, {useState, useEffect, useContext} from 'react';
import { collection, addDoc, deleteDoc, onSnapshot, doc } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthContext} from "../Login/AuthContext";

type Comment = {
    id: string,
    text: string,
}

const Comments = () => {
    const {isLoggedIn} = useContext(AuthContext)
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const docRef = await addDoc(collection(firestore, 'comments'), { text: newComment });
        setNewComment('');
        setComments([{ id: docRef.id, text: newComment }, ...comments]);
    };

    useEffect(() => {
        const unsub = onSnapshot(collection(firestore, 'comments'), (snapshot) => {
            let fetchedComments: Comment[] = [];
            snapshot.forEach((doc) => {
                fetchedComments.push({ id: doc.id, text: doc.data().text });
            });
            setComments(fetchedComments);
        });
        return () => unsub();
    }, []);

    const handleDelete = async (id: string) => {
        await deleteDoc(doc(firestore, 'comments', id));
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4 mb-3">Comments Section</h2>
            <p>This will allow visitors (like friends and family) to leave messages or comments.</p>
            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="form-group">
          <textarea
              className="form-control"
              value={newComment}
              onChange={handleInputChange}
              placeholder="Add a comment!" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div>
                {comments.map(comment => (
                    <div key={comment.id} className="card mb-3">
                        <div className="card-body">
                            <p className="m-0">{comment.text}</p>
                            {isLoggedIn &&
                            <button
                                className="btn btn-danger mt-2"
                                onClick={() => handleDelete(comment.id)}>Delete</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;