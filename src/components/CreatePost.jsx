import { useState } from "react";
import {fireStore,auth} from '../firebase'

const CreatePost=()=>{
    const [title, setTitle]=useState('');
    const [content, setContent]=useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {uid}=auth.currentUser;

        await fireStore.collection('posts').add({
            title,
            content,
            authId:uid,
            createdAt:new Date()
        });
        setTitle('');
        setContent('');

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

            <button type="submit">Post</button>

        </form>
    );
};

export default CreatePost;