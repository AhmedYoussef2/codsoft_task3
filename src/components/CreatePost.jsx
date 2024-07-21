import { useState } from "react";
import { fireStore, auth } from '../firebase';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentUser = auth.currentUser;

        if (!currentUser) {
            alert('You must be logged in to create a post.');
            return;
        }

        const { uid } = currentUser;

        try {
            await fireStore.collection('posts').add({
                title,
                content,
                authId: uid,
                createdAt: new Date()
            });

            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error adding post: ', error);
            alert('Failed to create post. Please try again later.');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 shadow-md rounded hover:shadow-xl hover:shadow-blue-500/50">
            <div className="mb-4">
                <label className="block font-bold mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block font-bold mb-2">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter post content"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Post
            </button>
        </form>
    );
};

export default CreatePost;
