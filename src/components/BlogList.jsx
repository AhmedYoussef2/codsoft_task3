import { useEffect, useState } from 'react';
import { fireStore, collection, getDocs } from '../firebase';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsCollection = collection(fireStore, 'posts');
                const postsSnapshot = await getDocs(postsCollection);
                const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(postsList);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="space-y-4">
            {posts.map(post => (
                <div key={post.id} className="p-4 shadow-md rounded-md">
                    <Link to={`/post/${post.id}`} className="block text-xl font-bold text-blue-500 hover:underline mb-2">
                        {post.title}
                    </Link>
                    <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
