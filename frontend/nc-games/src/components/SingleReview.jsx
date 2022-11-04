import React, { useEffect, useState } from "react";
import { getReview } from "../api";
import { useParams } from "react-router-dom";

export default function SingleReview() {
    const {review_id} = useParams()
    const [review, setReview] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{ 
        getReview(review_id)
        .then((reviewFromApi) => {
            
            if(review_id === undefined){   
                
                setReview(<h1>where do you think you're going</h1>);
                setLoading(false);
            }
            else{
         <h1>you are in the right place</h1>
            
            setReview(reviewFromApi); 
            setLoading(false);

        }
})
    }, [review_id]);

    if(loading) return <h2>loading...</h2>//loading message
    //set loading to false at the end of all useEffects, then add functionality in between setLoadings.
    return <ul>{<li className="review" key={review['review_id']}> 
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
     <p className="image">Image:</p><img src={review.review_img_url} className="img"></img>
     <br></br>
     <p className="revBody">Body:</p>{review.review_body}
     <br></br>
     <p className="votes">Votes:</p>{review.votes}</li> 
     }
     </ul>
 }