import { useEffect, useState } from 'react';
import { fireStore } from '../firebase';

import { Link } from 'react-router-dom';


const BlogList = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsCollection = await fireStore.collection('posts').get();
            setPosts(postsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchPosts();
    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <Link to={`/post/${post.id}`}>
                        <h2>{post.title}</h2>
                    </Link>
                    <p>{post.content.substring(0, 100)}....</p>
                </div>
            ))}
        </div>
    );
};

export default BlogList;