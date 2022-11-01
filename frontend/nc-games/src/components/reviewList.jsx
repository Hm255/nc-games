import React, {useState, useEffect} from "react";
import { getReviews } from "../api";

    const Reviewlist = ()=>{
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    //TIP
    //the useEffect is just data being loaded in/collected
    //always start a useEffect with something that shows the app is loading
    useEffect(()=>{ 
        setLoading(true);
        getReviews()
        .then((data) => {
            setReviews(data.reviews);
            setLoading(false);
        })
    }, []);
    if(loading) return <h2>loading...</h2>//loading message
//set loading to false at the end of all useEffects, then add functionality in between setLoadings.
return <ul>{reviews.map((review) => {
 
return <li class="reviews"> 
<p class="title">Title:</p>{review.title}
<br></br>
<p class="category">Category:</p>{review.category}
<br></br>
<p class="votes">Votes:</p>{review.votes}</li> 
  
})}
</ul>
}
export default Reviewlist