import React, { useState } from 'react';

// Define the structure of comment
type Comment = {
    id: number,
    text: string
}

const Comments = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id = comments.length + 1;
        setComments([...comments, {id: id, text: newComment}]);
        setNewComment(""); // Reset input field after submit
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
                    <p key={comment.id}>{comment.text}</p>
                ))}
            </div>
        </div>
    );
};

export default Comments;