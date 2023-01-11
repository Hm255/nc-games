import * as React from 'react';
import {useContext, useState, useEffect} from "react";
import { UserContext } from './UserContext';
import { getComments, postComment, removeComment } from "../api";
import {Link, useNavigate, useParams} from "react-router-dom";
const currentUrl = new URL(window.location.href);

    const Commentlist = ()=>{
    const {review_id} = useParams()
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('')
    const [posting, setPosting] = useState('')
    const [deleting, setDeleting] = useState(false);
    const { user } = useContext(UserContext);

    const comment = {
      author: user,
      body: newComment,
      created_at: Date.now(),
      votes: 0,
      review_id: review_id,
    };
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{ //gets comments
        getComments(review_id)
        .then((data) => {
            setComments(data.comment);
            console.log(data.comment); 
            navigate(currentUrl.search);
            setLoading(false);
})
    }, [review_id]); 

    const handleCommentChange = (event) => { //sets the value of whats in the comment body to what's typed
        setNewComment(event.target.value);
      };
     
      const handleSubmit = (event) => { //when the button is pressed
        event.preventDefault();
        if(posting){
        postComment(review_id, comment) //post to the reviewID
      .then((res)=> {
        console.log(res , '<< res', comment)
        setPosting(false)
      })
      .catch((err)=> {
        console.log(err)
      })
    }
        setNewComment('')
      };
      
    //   useEffect(()=> { possible posting comment solution
    //     if(posting){ 
    //   postComment(review_id, comment)
    //   .then((res)=> {
    //     console.log(res)
    //     setPosting(false)
    //   })
    //   .catch((err)=> {
    //     console.log(err)
    //   })
    //   setBody(newComment);
    //   setComments((prevComments) => {
    //     comment.comment_id = prevComments.length 
    //     return [...prevComments, comment]});
    //   setNewComment('');
    //     }
    // }, [review_id])
    
    const DeletePost = (event, comment_id) => {
      event.preventDefault();
      setDeleting(true)
      removeComment(comment_id)
      .then((res)=> {
        console.log("deleted", res)
        setDeleting(false)
      })
        .catch((err) => {console.log(err)
          setDeleting(false)
          return <h2>invalid request</h2>
        })
      }

if(loading) return <h2>loading page... press F5/refresh after 10 seconds if this persists</h2>
else if (posting) return <h2>posting... press F5/refresh after 10 seconds if this persists{comment.comment_id}</h2>
else if (deleting) return <h2>deleting... press F5/refresh after 10 seconds if this persists{comment.comment_id}</h2>
else if (comments.length === 0){
return <p className='noComments'> no comments </p>
}
else {
return <ul>{comments.map((comment) => {
return <li className="comments" key={comment['comment_id']}> 
<div className = "comment">
<Link to={`${comment.comment_id}`}>
       {comment.comment_id}
       </Link>
<br></br>
<p className="Author">Author:</p>{comment.author}
<br></br>
<p className="comment-body">Body:</p>{comment.body}
<br></br>
<p className="commentVotes">Votes:</p>{comment.votes}
<br></br>
<p className="comment-created-at">Made:</p>{comment.created_at}
{comment.author===user ? (
<button disabled={deleting} 
onClick={(event) => 
DeletePost(event, comment.comment_id)}>Delete</button>): ( //comment_id is only accessible here, when something has an ID and has to be removed you can reference the ID from anywhere it can be referenced from 
            ""
          )}
</div>
</li> 
})
}
<form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
        />
        <button type="submit" >Add Comment</button>
      </form>
      {/* {comments.map(comment => (
        <comment key={comment.id} comment={comment} />
      ))} */}

{
//make a form for comments including a comment body
//add newcomment.length !== 0/!comment.body variable to make sure comment is full before its posted
//set loading status to true when submit is pressed.
//add new comment to comments with setComments
//make sure details are added correctly
}
</ul>
}
}
export default Commentlist
