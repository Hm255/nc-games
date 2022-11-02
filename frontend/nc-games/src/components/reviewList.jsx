import React, {useState, useEffect} from "react";
import { getReviews } from "../api";

    const Reviewlist = ()=>{
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    //TIP
    //the useEffect is just data being loaded in/collected
    //always start a useEffect with something that shows the app is loading
    useEffect(()=>{ 
        getReviews()
        .then((data) => {
            setReviews(data.reviews);
            setLoading(false);
        })
    }, []);
    if(loading) return <h2>loading...</h2>//loading message
//set loading to false at the end of all useEffects, then add functionality in between setLoadings.
return <ul>{reviews.map((review) => {
return <li className="reviews" key={review['review_id']}> 
<p className="title">Title:</p>{review.title}
<br></br>
<p className="category">Category:</p>{review.category}
<br></br>
<p className="votes">Votes:</p>{review.votes}</li> 
  
})}
</ul>
}
export default Reviewlist