import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, doc, getDoc, updateDoc, fireStore } from "../firebase";

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [IsUpdated, setIsUpdated] = useState(false);

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
        e.preventDefault();
        try {
            const postRef = doc(collection(fireStore, "posts"), id);
            await updateDoc(postRef, {
                title,
                content,
                updatedAt: new Date(),
            });
            console.log("Post updated successfully")
        } catch (error) {
            console.error("Error updating post: ", error);
        }
        finally {
            setIsUpdated(true);
        }
    };

    if (IsUpdated) {
        return (
            <div className="max-w-2xl mx-auto p-4 text-center shadow-lg font-bold rounded shadow-green-500/50 my-24">
                <p className="text-bold">Post updated successfully</p>
                <Link to={`/home/page`}>
                    <button className="bg-green-500 my-3 mx-4 text-white px-2 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 no-cursor">
                        Go Back
                    </button>
                </Link>
            </div>
        );
    }
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
            <div className='flex my-3 justify-end'>
                <button type="submit" className="bg-blue-500 my-3 mx-4 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Update
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

export default EditPost;
