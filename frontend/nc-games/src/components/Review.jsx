// import React, { useEffect, useState } from "react";
// import { getReview } from "../api";
// import {Link} from "react-router-dom";

// export default function SingleReview(id) {
//     const [review, setReview] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(()=>{ 
//         getReview(id)
//         .then((data) => {
//             console.log(data)
//             if(id === undefined){   
                
//                 setReview(<h1>where do you think you're going</h1>);
//                 setLoading(false);
//             }
//             else{
//          <h1>you are in the right place</h1>
            
//             setReview(data.review); 
//             setLoading(false);

//         }
// })
//     }, [id]);

//     if(loading) return <h2>loading...</h2>//loading message
//     //set loading to false at the end of all useEffects, then add functionality in between setLoadings.
//     return <ul>{review.map((review) => {
//     return <li className="reviews" key={review['review_id']}> 
//     <Link to={`/Reviewlist/${review.review_id}`}>
//            {review.review_id}
//            </Link>
//     <br></br>
//     <p className="title">Title:</p>{review.title}
//     <br></br>
//     <p className="category">Category:</p>{review.category}
//     <br></br>
//     <p className="votes">Votes:</p>{review.votes}</li> 
//     })}
//     </ul>
// }