import * as React from 'react';
import {useState, useEffect, useState, useContext} from "react"; 
import { getAllComments } from "../api";
import { CommentContext } from './CommentContext';
const currentUrl = new URL(window.location.href);

    const AllComments = ()=>{
    const { theme, setTheme } = useContext(CommentContext);
    const [Allcomments, setAllComments] = useState([]);      //all comments 
    const [loading, setLoading] = useState(true);            //when something is rendering
    const [newComment, setNewComment] = useState('')         //the actual comment
    }

    useEffect(()=>{ //gets comments
        getAllComments()
        .then((data) => {
            setAllComments(data.comment);
            setLoading(false);
})
    }); 