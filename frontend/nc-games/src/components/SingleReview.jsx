import React, { useEffect, useState } from "react";
import { getReview } from "../api";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Commentlist from "./Commentlist" //this is empty before singleReview fully renders

export default function SingleReview(props) {
    const {review_id} = useParams()
    const [review, setReview] = useState({});
    const [err, setErr] = useState('')                  //for displaying errors
    const [loading, setLoading] = useState(true);

    useEffect(()=>{ 
        getReview(review_id)
        .then((reviewFromApi) => {
            setReview(reviewFromApi); 
})
.catch((err) => {
    setErr({err})
    console.log(err)
    setLoading(false)
})  
setLoading(false)
    }, [review_id]);

    
    if(loading) return <h2>loading...</h2>//loading message
    // if(err) return <h2>{err}<ErrorPage /></h2>
    //set loading to false at the end of all useEffects, then add functionality in between setLoadings.
    return <ul>{<li className="review" key={review['review_id']}> 
    <div class="wrapper">
    <div><span class="dot"></span></div>
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
     <div><span class="dot"></span></div>
     </div>
     </li>
     }
     <Commentlist />
     </ul>
 }