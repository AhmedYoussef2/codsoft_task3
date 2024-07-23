import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fireStore, doc, deleteDoc, getDoc } from "../firebase";

const DeletePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postDoc = await getDoc(doc(fireStore, 'posts', id));
                if (postDoc.exists()) {
                    setPost(postDoc.data());
                } else {
                    setError("Post not found");
                }
            } catch (error) {
                setError("Error fetching post");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            const postDoc = doc(fireStore, 'posts', id);
            await deleteDoc(postDoc);
            navigate('/home/page');
        } catch (error) {
            console.log("Error in deleting post");
        }
    };

    if (loading) {
        return <p className="text-gray-700">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4 shadow-md rounded shadow-md rounded hover:shadow-xl hover:shadow-blue-500/50">
            {post ? (
                <>
                    <h2 className="text-2xl text-center font-bold mb-4">{post.title}</h2>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className='flex my-3 justify-end'>
                        <button onClick={handleDelete}
                            className="bg-red-500 no-cursor my-3 mx-4 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                            Delete
                        </button>
                        <Link to={`/home/page`}>
                            <button className="bg-blue-500 my-3 mx-4 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 no-cursor">
                                Cancel
                            </button>
                        </Link>
                    </div>

                </>
            ) : (
                <p className="text-gray-700">Post not found</p>
            )}
        </div>
    );
};

export default DeletePost;
