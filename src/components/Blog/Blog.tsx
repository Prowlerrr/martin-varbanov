import React, { useState } from 'react';

interface Post {
    title: string;
    content: string;
}

const Blog: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<Post>({
        title: '',
        content: ''
    });

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPost({ ...newPost, title: event.target.value });
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewPost({ ...newPost, content: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setPosts([newPost, ...posts]);
        setNewPost({ title: '', content: '' });
    };

    return (
        <div>
            <h2>Blog</h2>
            <p>A simple blog where your son can document his thoughts, what he learned, vacation trips etc.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={newPost.title} onChange={handleTitleChange} />
                </label>
                    <br/>
                <label>
                    Content:
                    <textarea value={newPost.content} onChange={handleContentChange} />
                </label>
                <br/>
                <button type='submit'>Submit</button>
            </form>
            {posts.map((post, index) => (
                <div key={index}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    )
};

export default Blog;