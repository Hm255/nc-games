import * as React from 'react';
import {useState, useEffect} from "react";
import { getReviews } from "../api";
import { useParams, useSearchParams, Link} from "react-router-dom";
import Sortby from "./Sortby"
import Orderby from "./Orderby"


const options2 = [
    { value: 'review_id', label: 'Review ID' },
    { value: 'Votes', label: 'Vote count' },
    { value: 'created_at', label: 'recent' },
    { value: 'comment_count', label: 'comment count' }
  ];

const options = [{value: 'asc', label: 'ascending order'}, 
                {value: 'Desc', label: 'descending order'}
            ];


    const Reviewlist = ()=>{
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSort] = useState('');
    const [orderBy, setOrder] = useState('');
    const [Category, setCategory] = useState('');
   
    

    useEffect(()=>{ 
        getReviews(sortBy, orderBy, Category)
        .then((data) => {
           console.log([data.reviews, {Category}, orderBy, sortBy])
           setSort(sortBy);
           setOrder(orderBy);
            setCategory(Category);
            setReviews(data.reviews); 
            setLoading(false);
})
    }, [sortBy, orderBy, Category]);

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
<div className = 'OrderBy'>
<Orderby options={options} />
</div>
<Sortby options={options2}/>
</ul>
}
}
export default Reviewlist
