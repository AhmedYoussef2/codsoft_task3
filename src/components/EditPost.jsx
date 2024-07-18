import {useState,useEffect} from "react";
import {fireStore} from "../firebase";
import {useParams} from "react-router-dom";


const EditPost=()=>{
    
    const {id}=useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(()=>{
        const fetchPost=async()=>{
            const postRef=fireStore.collection('posts').doc(id);
            const postDoc= await postRef.get();
            if (postDoc.exists){
                const postData=postDoc.data();
                setTitle(postData.title);
                setContent(postData.content);
            }
        };
        fetchPost();
    },[id]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {uid}=auth.currentUser;

        await fireStore.collection('posts').doc(id).update({
            title,
            content,
            updatedAt:new Date()
        });
    };

    return(
        <form onSubmit={handleSubmit}>

            <input 
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Title"/>

            <textarea
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            placeholder="Content"/>

            <button type="submit">Update</button>

        </form>
    );

};

export default EditPost;