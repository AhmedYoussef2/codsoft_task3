import { useState, useEffect } from "react";
import { fireStore } from "../firebase";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postRef = doc(collection(fireStore, "posts"), id);
                const postDoc = await getDoc(postRef);
                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    setTitle(postData.title);
                    setContent(postData.content);
                }
            } catch (error) {
                console.error("Error fetching post: ", error);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
         // const {uid}=auth.currentUser;
        e.preventDefault();
        try {
            const postRef = doc(collection(fireStore, "posts"), id);
            await updateDoc(postRef, {
                title,
                content,
                updatedAt: new Date(),
            });
        } catch (error) {
            console.error("Error updating post: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 shadow-md rounded hover:shadow-xl hover:shadow-blue-500/50">
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Title</label>
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
                <label className="block text-sm font-bold mb-2">Content</label>
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
                Update
            </button>
        </form>
    );
};

export default EditPost;
