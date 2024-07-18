import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fireStore } from ".../firebase";


const BlogPost = () => {

    const { id } = useParams();
    const History = useHistory();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const doc = await fireStore.collection('posts').doc(id).get();
            if (doc.exists) {
                setPost(doc.data());
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        await fireStore.collection('posts').doc(id).delete();
        history.push('/');
    };

    return (
        <div>
            {post && (
                <>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default BlogPost;