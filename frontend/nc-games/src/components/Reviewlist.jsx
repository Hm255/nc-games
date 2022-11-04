import React, {useState, useEffect} from "react";
import { getReviews } from "../api";
import { useParams, Link } from "react-router-dom";


    const Reviewlist = ()=>{
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    //TIP
    //the useEffect is just data being loaded in/collected
    //always start a useEffect with something that shows the app is loading
        const {category} = useParams()
        
    useEffect(()=>{ 
        getReviews()
        .then((data) => {
            
            if(category === undefined){   
                
                setReviews(data.reviews);
                setLoading(false);
            }
            else{
            const filtered = data.reviews.filter(review => 
            review.category === category  
            )
            
            setReviews(filtered); 
            setLoading(false);

        }
})
    }, [category]);


 if(loading) return <h2>loading...</h2>//loading message
//set loading to false at the end of all useEffects, then add functionality in between setLoadings.
return <ul>{reviews.map((review) => {
return <li className="reviews" key={review['review_id']}> 
<Link to={`/Reviewlist/review/${review.review_id}`}>
       {review.review_id}
       </Link>
<br></br>
<p className="title">Title:</p>{review.title}
<br></br>
<p className="category">Category:</p>{review.category}
<br></br>
<p className="votes">Votes:</p>{review.votes}</li> 
})}
</ul>
}
export default Reviewlist
