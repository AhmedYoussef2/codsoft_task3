import { useEffect, useState } from 'react';
import { fireStore, collection, query, auth, where, getDocs, onAuthStateChanged } from '../firebase';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const postsCollectionPosts = query(collection(fireStore, 'posts'), where('authId', '==', currentUser.uid));
                    const postsSnapshot = await getDocs(postsCollectionPosts);
                    const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setPosts(postsList);
                    console.log('posts fetched successfully');
                } catch (error) {
                    console.error("Error fetching posts: ", error);
                }
            } else {
                console.error("No user is currently logged in.");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='flex justify-end'>
                <Link to={`/create/post`}>
                    <button className="bg-fuchsia-500 text-white px-4 py-2 rounded-2xl hover:bg-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 no-cursor">
                        Create
                    </button>
                </Link>
            </div>

            <div className="space-y-4">
                {posts.map(post => (
                    <div key={post.id} className="pt-4 pl-4 shadow-md rounded-md my-10 bg-gray-100 hover:shadow-xl hover:shadow-indigo-500/50">
                        <div className="block text-lg font-bold mb-2">
                            {post.title}
                        </div>
                        <p>{post.content.substring(0, 500)}</p>
                        <div className='flex my-3 justify-end'>
                            <Link to={`/edit/post/${post.id}`}>
                                <button className="bg-blue-500 my-3 text-white px-5 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 no-cursor">
                                    Edit
                                </button>
                            </Link>
                            <Link to={`/delete/post/${post.id}`}>
                                <button className="bg-red-500 my-3 mx-4 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 no-cursor">
                                    Delete
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BlogList;
