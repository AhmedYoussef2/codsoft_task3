import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { fireStore } from "../firebase";

const DeletePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postRef = doc(fireStore, 'posts', id);
                const postDoc = await getDoc(postRef);
                if (postDoc.exists()) {
                    setPost(postDoc.data());
                }
            } catch (error) {
                console.error('Error fetching post: ', error);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            const postDoc = doc(fireStore, 'posts', id);
            await deleteDoc(postDoc);
            navigate('/');
        } catch (error) {
            console.error('Error deleting post: ', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 shadow-md rounded shadow-md rounded hover:shadow-xl hover:shadow-blue-500/50">
            {post ? (
                <>
                    <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </>
            ) : (
                <p className="text-gray-700">Loading...</p>
            )}
        </div>
    );
};

export default DeletePost;
