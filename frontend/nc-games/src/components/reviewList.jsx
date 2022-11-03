import React, {useState, useEffect} from "react";
import { getReviews } from "../api";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

    const Reviewlist = ()=>{
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    //TIP
    //the useEffect is just data being loaded in/collected
    //always start a useEffect with something that shows the app is loading
        const {category} = useParams()
        console.log(category)//gets current selected category from url
    useEffect(()=>{ 
        getReviews()
        .then((data) => {
            console.log(category)
            if(category === undefined){   //each time the ==/=== alternated, the first console log returns an array (filtered) of objects containing the filtered reviews, then never again after reloads/genre changes.
                console.log(data.reviews)
                setReviews(data.reviews);
                setLoading(false);
            }
else{
            const filtered = data.reviews.filter(review => 
            review.category === category  
            )
            console.log(filtered)
            setReviews(filtered); //when this stops working(after refresh) go back to menu then into categories and select a category, then change filtered to data.reviews and load all reviews, then change it back and the filter should work.
            setLoading(false);

        }
})
    }, [category]);


    if(loading) return <h2>loading...</h2>//loading message
//set loading to false at the end of all useEffects, then add functionality in between setLoadings.
return <ul>{reviews.map((review) => {
return <li className="reviews" key={review['review_id']}> 
<Link to={review.title}>{review.title}</Link>
<p className="title">Title:</p>{review.title}
<br></br>
<p className="category">Category:</p>{review.category}
<br></br>
<p className="votes">Votes:</p>{review.votes}</li> 
})}
</ul>
}
export default Reviewlist