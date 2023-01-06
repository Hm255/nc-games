import * as React from 'react';
import {useState, useEffect} from "react";
import { postComment } from "../api";
import {useParams} from "react-router-dom";

    const NewComment = ()=>{
    const {review_id} = useParams()
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);

   

    const postData = (event) => {
        event.preventDefault()
        postComment(review_id)
        .then((res) => console.log('Post data', setBody(res)))
    }
      
    
if(loading) return <h2>loading...</h2>
else{
    return(
    <form>
        <input type='text' name="commentBody"></input>
    <button type="submit" onSubmit={(event)=> {setBody(event)}}{...console.log({body})}>Send data</button>
    {body && <p>Comment: {body}</p>}
  </form>)
}
    
}
    
export default NewComment