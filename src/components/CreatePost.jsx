import { useState } from "react";
import { fireStore, collection, addDoc, auth } from '../firebase';
import { useNavigate, Link } from "react-router-dom";

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const currentUser = auth.currentUser;

        try {
            await addDoc(collection(fireStore, 'posts'), {
                title,
                content,
                authId: currentUser.uid,
                createdAt: new Date()
            });
            console.log(currentUser.email);
            navigate('/home/page');
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

            <div className='flex my-3 justify-end'>
                <button
                    type="submit"
                    className="bg-blue-500 text-white no-cursor px-4 my-3 mx-4 px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 no-cursor">
                    Post
                </button>
                <Link to={`/home/page`}>
                    <button className="bg-red-500 my-3 mx-4 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 no-cursor">
                        Cancel
                    </button>
                </Link>
            </div>
        </form>
    );
};

export default CreatePost;
