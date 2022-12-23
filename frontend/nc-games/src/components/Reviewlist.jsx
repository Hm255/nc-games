import * as React from 'react';
import {useState, useEffect} from "react";
import { getReviews } from "../api";
import { useParams, Link, useNavigate} from "react-router-dom";
import SortbyOrderBy from './SortbyOrderby';
const currentUrl = new URL(window.location.href);

    const Reviewlist = ()=>{
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState('desc');
    const [sort, setSort] = useState('created_at');
    const navigate = useNavigate();
    const {Category} = useParams();

    useEffect(()=>{ 
        getReviews(sort, order, Category)
        .then((data) => {
           console.log([data.reviews, {Category}, order, sort])
           setSort(sort);
           setOrder(order);
            setReviews(data.reviews); 
            currentUrl.searchParams.set('sortedBy', sort);
            currentUrl.searchParams.set('orderedBy', order);
            navigate(currentUrl.search);
            setLoading(false);
})
    }, [order, sort, Category]);


//   useEffect(() => {
//   getReviews(sort, order, Category)
//   .then((data) => {
//     setSort(sort);
//     setOrder(order);
//     setReviews(data.reviews);
//      currentUrl.searchParams.set('sortedBy', sort);
//     currentUrl.searchParams.set('orderedBy', order);
//     navigate(currentUrl.search);
//     console.log(data.reviews)
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }, [sort, order, Category]);    

 if(loading) return <h2>loading...</h2>
else{
return <ul>{reviews.map((review) => {
return <li className="reviews" key={review['review_id']}> 
<Link to={`/reviews/${review.review_id}`}>
       {review.review_id}
       </Link>
<br></br>
<p className="title">Title:</p>{review.title}
<br></br>
<p className="category">Category:</p>{review.category}
<br></br>
<p className="votes">Votes:</p>{review.votes}
</li> 
})
}
<div className="sortByOrderBy">
<SortbyOrderBy  />
</div>
</ul>
}
}
export default Reviewlist
