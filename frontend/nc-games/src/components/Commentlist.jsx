import * as React from 'react';
import {useContext, useState, useEffect} from "react";
import { UserContext } from './UserContext';   
import { getComments, getAllComments, postComment, removeComment } from "../api";
import {Link, useNavigate, useParams} from "react-router-dom";
const currentUrl = new URL(window.location.href);

    const Commentlist = ()=>{
    const {review_id} = useParams()                    //selected review
    const [comments, setComments] = useState([]);      //all comments 
    const [loading, setLoading] = useState(true);      //when something is rendering
    const [newComment, setNewComment] = useState('')   //the actual comment
    const [posting, setPosting] = useState(false)      //for when a post needs to load in
    const [deleting, setDeleting] = useState(false);   //for when a post needs deleting
    const [err, setErr] = useState('')                  //for displaying errors
    const { user } = useContext(UserContext);          //loads a user as context, the user is set in App.js
    const [allComments, setAllComments] = useState();

    const comment = { //must only have user inputted variables
      username: user,
      body: newComment
    };
   
    const navigate = useNavigate(); 

    useEffect(()=>{ //gets and post comments
        getComments(review_id)
        .then((data) => {
            setComments(data.comment);
            console.log(data.comment); 
            navigate(currentUrl.search);
            setLoading(false);
})
getAllComments().then((res) => {
  setAllComments(res.comments);
})
.catch((err)=> {
  console.log(err)
  setErr(err)
})
if(posting){ 
      postComment(review_id, comment)
      .then((res)=> {
        console.log(res)
        setPosting(false)
        setComments((prevComments) => {
          comment.comment_id = allComments.slice(allComments.length-1)[0].comment_id+1
          console.log(comment.comment_id)
          return [...prevComments, comment]});
      })
      .catch((err)=> {
        console.log(err)
        setErr(err)
        setPosting(false)
      })
      setNewComment('');
        }
    }, [review_id, posting]); 

    const handleCommentChange = (event) => { //sets the value of whats in the comment body to what's typed into the box
        setNewComment(event.target.value);
      };
               
    const DeletePost = (event, comment_id) => { //button for deleting posts
      event.preventDefault();
      setDeleting(true)
      removeComment(comment_id)
      .then((res)=> {
        console.log("deleted", res)
        setDeleting(false)
      })
        .catch((err) => {console.log(err)
          setErr(err)
          setDeleting(false)
          return <h2>invalid request</h2>
        })
      }

if(loading) return <h2>loading page... press F5/refresh after 10 seconds if this persists</h2>
else if (posting) return <h2>posting... press F5/refresh after 10 seconds if this persists{comment.comment_id}</h2>
else if (deleting) return <h2>deleting... press F5/refresh after 10 seconds if this persists{comment.comment_id}</h2>
else if (err) return <h2>{err}</h2>
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
{comment.author===user ? ( //if we own the comment
<button disabled={deleting} //you can only click to set deleting once
onClick={(event) => 
DeletePost(event, comment.comment_id)}>Delete Your Comment</button>): ( //if the user matches, this button appears and the user can delete its comment
            '' //otherwise it shows nothing
          )}
</div>
</li> 
})
}
<form>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
        />
        <button type="submit" onClick={(event) => setPosting(true)}>Add Comment</button>
      </form>
      {/* {comments.map(comment => (
        <comment key={comment.id} comment={comment} />
      ))} */}

{
//comment_id needs fixing
}
</ul>
}
}
export default Commentlist
