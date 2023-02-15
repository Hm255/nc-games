import React, { useEffect, useState, useContext } from "react";
import { getReview, editReview } from "../api";
import { useParams, useSearchParams, Link, useNavigate} from "react-router-dom";
import {AiFillCaretLeft, AiFillFastBackward, AiOutlineUserSwitch, AiFillLike, AiFillDislike} from "react-icons/ai";
import ErrorPage from "./ErrorPage";
import { BiDislike, BiLike } from "react-icons/bi";
import { UserContext } from "./UserContext";
import Commentlist from "./Commentlist" //this is empty before singleReview fully renders
import { LikeContext } from "./LikeContext";
import { DislikeContext } from "./DislikeContext";

let voteInc = 1;

export default function SingleReview(props) {
    const {review_id} = useParams()
    const [review, setReview] = useState({});
    const [error, setError] = useState(null)                  //for displaying errors
    const [errMsg, setErrMsg] = useState(null);
    const { user } = useContext(UserContext);
    const [errFix, setErrFix] = useState (null)
    const [loading, setLoading] = useState(true);
    const [votes, setVotes] = useState(review.votes)
    // const {Liked, setLiked} = useContext(LikeContext)
    // const {Disliked, setDisliked} = useContext(DislikeContext)
    const [Like, setLike] = useState(false)
    const [Dislike, setDislike] = useState(false)

    // const voteInc = { inc_votes : 1 }
    // const voteDec = { inc_votes : -1 }

    const navigate = useNavigate()
    useEffect(()=>{ 
        getReview(review_id)
        .then((reviewFromApi) => {//for error handling, take the return obj and check if it is ok, if not then it will return its given errors defined in the frontend api
            setReview(reviewFromApi)
            console.log(reviewFromApi.votes)
            if(!reviewFromApi.ok){
                console.table(reviewFromApi.props.children)
                setError(reviewFromApi.props.children[1])
                if (error === 400){
                    setErrMsg('invalid location')
                    setErrFix('only numbers are valid in the url')
                }
                else if(error === 404){ 
                    setErrMsg('review does not exist')
                    setErrFix('search for an existing review')
                }
            }
})
.catch((err) => {
    console.log(err)
    setLoading(false)
})  
setLoading(false)
    }, [review_id, error]);

    // const incrementVotes = (increment) => {
    //     setVotes((votes) => {
    //       return review.votes + increment;
    //     });
    //   };
      if(Like){
        editReview(voteInc = {inc_votes: 1}, review_id)
      }
      else if(Dislike){
        editReview(voteInc = {inc_votes: -1}, review_id)
      }
    if(loading) return <h2>loading...</h2>//loading message
    if(error) return <ul>
        <div className="error">
        {error && <ErrorPage errorMessage={`${error}: ${errMsg}, ${errFix}`} />}
        </div>
        </ul>
    
    //set loading to false at the end of all useEffects, then add functionality in between setLoadings.
    return <ul>
        <h2 className="username">{user}</h2>
       <nav className="Links"><Link to={`/reviews`}> <p>Back to reviews</p> <AiFillCaretLeft /></Link>
            <Link to={`/`}>        <p>back to home</p> <AiFillFastBackward /></Link> 
            <Link to={`/users`}>   <p>change user</p> <AiOutlineUserSwitch /></Link>
            </nav> 
        {<li className="review" key={review['review_id']}> 
    <div>
     <br></br>
     <p className="title">Title:</p>
     <p className="reviewTitle">{review.title}</p>
     <br></br>
     <p className="owner">Owner:</p>
     <p className="reviewOwner">{review.owner}</p>
     <br></br>
     <p className="uploaded">Uploaded:</p>
     <p className="reviewDate">{new Date((review.created_at)).toString()}</p>
     <br></br>
     <p className="category">Category:</p>
     <p className="reviewCategory">{review.category}</p>
     <br></br>
     <p className="designer">Designer:</p>
     <p className="reviewDesigner">{review.designer}</p>
     <br></br>
     <p className="image">Image:</p><img src={review.review_img_url} className="img" alt="img"></img>
     <br></br>
     <p className="revBody">Description:</p>
     <p className="reviewBody">{review.review_body}</p>
     <br></br>
     <p className="votes">Votes:</p>
     <p className="reviewVotes">{review.votes}</p>
     <div>{user && !Dislike && !Like? (<button className="Like" onClick={() => setLike(!Like)}><BiLike /></button>
     ):('')}
     {user && Like? (<button className="Liked" onClick={() => setLike(!Like)}><AiFillLike />Liked!</button>
     ):('')}
          {user && !Like && !Dislike? (<button className="Dislike" onClick={() => setDislike(!Dislike)}><BiDislike /></button>
     ):('')}
     {user && Dislike? (<button className="Disliked" onClick={() => setDislike(!Dislike)}><AiFillDislike />Disliked!</button>
     ):('')}
     </div>
     </div>
     
     <br></br>
     </li>
     }
     <Commentlist />
     </ul>
 }