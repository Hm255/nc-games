import * as React from 'react';
import {useContext, useState, useEffect, useCallback} from "react";
import { UserContext } from './UserContext';   
import {ImBin} from "react-icons/im";
import {AiOutlineEnter, AiFillLike, AiFillDislike} from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import { CiFaceMeh } from "react-icons/ci";
import { getComments, getAllComments, postComment, removeComment, commentVote } from "../api";
import {useNavigate, useParams} from "react-router-dom";
import {ReactDOM, createRoot} from 'react-dom';
import Comment from "./Comment"
//import Comment from './Comment';
const currentUrl = new URL(window.location.href);

    const Commentlist = ()=>{
    const {review_id} = useParams()                    //selected review
    const [comments, setComments] = useState([]);      //all comments 
    const [loading, setLoading] = useState(true);      //when something is rendering
    const [newComment, setNewComment] = useState('')   //the actual comment
    const [posting, setPosting] = useState(false)      //for when a post needs to load in
    const [deleting, setDeleting] = useState(false);   //for when a post needs deleting
    const [err, setErr] = useState(null)                  //for displaying errors
    const { user } = useContext(UserContext);          //loads a user as context, the user is set in App.js
    const [allComments, setAllComments] = useState();
    const [Like, setLike] = useState()
    const [Dislike, setDislike] = useState()
    
  

    const comment = { //must only have user inputted variables
      username: user,
      body: newComment
    };
   
    const navigate = useNavigate();

    useEffect(()=>{ //gets and post comments
        getComments(review_id)
        .then((data) => {
          if(data){
            setComments(data.comment);
            console.table(data.comment);
            navigate(currentUrl.search);
            setLoading(false);
          }
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

      let userComments = comments.map((item, index, array) => {
        return <Comment
          key={item.comment_id}
          author={item.author}
          comment_id={item.comment_id}
          body={item.body}
          review_id={item.review_id}
          votes={item.votes}
          created_at={item.created_at}
        />;
      //   return <Comment
      //   author={comment.author}
      //   comment_id={comment.comment_id}
      //   body={comment.body}
      //   review_id={comment.review_id}
      //   votes={comment.votes}
      //   created_at={comment.created_at}
      //   liked={comment.liked}
      //   disliked={comment.disliked}
      // />
      });
console.log(userComments)

const handleCommentChange = (event) => { //sets the value of whats in the comment body to what's typed into the box
  setNewComment(event.target.value);
};

const DeletePost = (event, comment_id) => { //button for deleting posts
event.preventDefault();
setDeleting(true)
removeComment(comment_id)
.then((res)=> {
  console.log("deleted", res)
  getComments(review_id)
  .then((data)=> {
    setComments(data.comment)
  })
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
return <ul>
  <p className='noComments'> no comments <CiFaceMeh /></p>
  <form>
        <input
          type="text"
          className="commentBox"
          value={newComment}
          onChange={handleCommentChange}
        />
        <br>
        </br>
        {newComment === '' ? (<p className ="commentValidation">please be logged in and enter a comment before posting</p>):(<button type="submit" disabled={!user} className="submitButton "onClick={(event) => setPosting(true)}><AiOutlineEnter /></button>)}
      </form>
</ul>
}
else {
return <ul>
  
  <form>
        <input
          type="text"
          placeholder='Comment here!'
          className="commentBox"
          value={newComment}
          onChange={handleCommentChange}
        />
        <br>
        </br>
       {newComment === '' ? (<p className="commentValidation">please enter a comment before posting</p>):(<button type="submit" disabled={!user} className="submitButton" onClick={(event) => setPosting(true)}><AiOutlineEnter /></button>)} 
      </form>
{userComments.map((comment) => {
return <li className="comments" key={comment.props['comment_id']}> 
<div className = "comment">
<br></br>
<p className="Author" required={true} >Author:</p>{comment.props.author}
<br></br>
<p className="comment-body">Body:</p>{comment.props.body}
<br></br>
<p className="commentVotes">Votes:</p>{comment.props.votes}
<div className="LikeAndDislikeButtons">
  {/* {user && !Dislike && !Like? (<button className="Like" id={comment['comment_id']} onClick={(event) => {event.preventDefault(); }}><BiLike /></button>):('')}
  {user && Like && !Dislike? (<button className="Liked" id={comment['comment_id']} onClick={(event) => {event.preventDefault(); }}><AiFillLike />Liked!</button>):('')}
  {user && !Like && !Dislike? (<button className="Dislike" id={comment['comment_id']} onClick={(event) => {event.preventDefault(); }}><BiDislike /></button>):('')}
  {user && Dislike && !Like? (<button className="Disliked" id={comment['comment_id']} onClick={(event) => {event.preventDefault(); }}><AiFillDislike />Disliked!</button>):('')} */}
  <Comment 
  key={comment.props['comment_id']}
  author={comment.props['author']}
  comment_id={comment.props['comment_id']}
  body={comment.props['body']}
  review_id={comment.props['review_id']}
  votes={comment.props['votes']}
  created_at={comment.props['created_at']}
  />
     </div>
<br></br>
<p className="comment-created-at">Made:</p>{new Date(comment.props.created_at).toString()}
<br></br>
{comment.props.author===user ? (
<button disabled={deleting}
onClick={(event) => DeletePost(event, comment.comment_id)}><ImBin /></button>): ( 
            '' 
          )}
</div>
{console.log(comment.key, comment.props)}
</li>
})
}
</ul>
}
}
export default Commentlist
//set comment.liked/disliked to true or false
//how would I correctly refer to props to get my state prop values from userComments returned to my page?