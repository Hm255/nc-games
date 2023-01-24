import React, { useEffect, useState, useContext } from "react";
import { getReview } from "../api";
import { useParams, Link } from "react-router-dom";
import {AiFillCaretLeft, AiFillFastBackward, AiOutlineUserSwitch} from "react-icons/ai";
import ErrorPage from "./ErrorPage";
import { UserContext } from "./UserContext";
import Commentlist from "./Commentlist" //this is empty before singleReview fully renders

export default function SingleReview(props) {
    const {review_id} = useParams()
    const [review, setReview] = useState({});
    const [error, setError] = useState(null)                  //for displaying errors
    const [errMsg, setErrMsg] = useState(null);
    const { user } = useContext(UserContext); 
    const [errFix, setErrFix] = useState (null)
    const [loading, setLoading] = useState(true);

    useEffect(()=>{ 
        getReview(review_id)
        .then((reviewFromApi) => {//for error handling, take the return obj and check if it is ok, if not then it will return its given errors defined in the frontend api
            setReview(reviewFromApi)
            if(!reviewFromApi.ok){
                console.table(reviewFromApi.props.children)
                setError(reviewFromApi.props.children[1])
                if (error === 400){
                    setErrMsg('invalid location')
                    setErrFix('only numbers are valid in the url')
                }
                else if(error === 404){ 
                    setErrMsg('review doesnt exist')
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

    if(loading) return <h2>loading...</h2>//loading message
    if(error) return <ul>{<h2 className="errorMessage">{error}: {errMsg}, <br></br>fix: {errFix}</h2>}</ul>
    //set loading to false at the end of all useEffects, then add functionality in between setLoadings.
    return <ul>
        <h2 className="username">{user}</h2>
        <Link to={`/reviews`}>
       <p>Back to reviews</p> <AiFillCaretLeft />
        </Link>
        <Link to={`/`}>
       <p>back to home</p> <AiFillFastBackward />
        </Link>
        <Link to={`/users`}>
       <p>change user</p> <AiOutlineUserSwitch />
        </Link>
        {<li className="review" key={review['review_id']}> 
    <div className="wrapper">
     <br></br>
     <p className="title">Title:</p>{review.title}
     <br></br>
     <p className="owner">Owner:</p>{review.owner}
     <br></br>
     <p className="uploaded">Uploaded:</p>{review.created_at}
     <br></br>
     <p className="category">Category:</p>{review.category}
     <br></br>
     <p className="designer">Designer:</p>{review.designer}
     <br></br>
     <p className="image">Image:</p><img src={review.review_img_url} className="img" alt="img"></img>
     <br></br>
     <p className="revBody">Body:</p>{review.review_body}
     <br></br>
     <p className="votes">Votes:</p>{review.votes}
     <br></br>
     </div>
     </li>
     }
     <ErrorPage />
     <Commentlist />
     </ul>
 }