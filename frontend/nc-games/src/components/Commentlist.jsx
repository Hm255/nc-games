// import React, {useState, useEffect} from "react";
// import { getComments } from "../api";
// import { useParams, Link } from "react-router-dom";
// import Sortby from "./Sortby";
// import Orderby from "./Orderby";

//     const Reviewlist = ()=>{
//     const [reviews, setReviews] = useState([]);
//     const [sortedBy, setSort] = useState('created_at');
//     const [orderedBy, setOrder] = useState('desc');
//     const [loading, setLoading] = useState(true);
//         const {category} = useParams()
        
//     useEffect(()=>{ 
//         getReviews(sortedBy, orderedBy, category)
//         .then((data) => {
//             console.log([data, sortedBy, orderedBy, category])
//             setOrder(orderedBy)
//             setSort(sortedBy)
//             setReviews(data.reviews); 
//             setLoading(false);
// })
//     }, [sortedBy, orderedBy, category]);

//  if(loading) return <h2>loading...</h2>
// else{
// return <ul>{reviews.map((review) => {
// return <li className="reviews" key={review['review_id']}> 
// <Link to={`/reviews/${review.review_id}`}>
//        {review.review_id}
//        </Link>
// <br></br>
// <p className="title">Title:</p>{review.title}
// <br></br>
// <p className="category">Category:</p>{review.category}
// <br></br>
// <p className="votes">Votes:</p>{review.votes}</li> 
// })}
// <div>
// <Sortby />
// <Orderby />    
// </div>
// </ul>

// }
 
// }

// export default Commentlist

