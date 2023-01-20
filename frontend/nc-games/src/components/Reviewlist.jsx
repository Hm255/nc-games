import * as React from 'react';
import {useState, useEffect} from "react";
import { getReviews } from "../api";
import {Link, useNavigate} from "react-router-dom";
import Sortby from './Sortby';
import Orderby from './Orderby';
import CategorySort from './CategorySort';
import { BsBook } from "react-icons/bs";

const currentUrl = new URL(window.location.href);

    const Reviewlist = ()=>{
    const [reviews, setReviews] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState('desc');     //sets the order
    const [sort, setSort] = useState('created_at'); //sets the sorted variable
    const [err, setErr] = useState('')
    const [Category, setCategory] = useState('');   //sets the category
    const navigate = useNavigate();

    const handleSortChange = (newValue) => { 
      setSort(newValue);
    }
    const handleOrderChange = (newValue) => {
        setOrder(newValue);
      }
      const handleCategoryChange = (newValue) => { 
        setCategory(newValue);
      }

    useEffect(()=>{ 
        getReviews(sort, order, Category)
        .then((data) => {
            setReviews(data.reviews); 
            console.table(data.reviews)
            console.log([Category, order, sort])
              currentUrl.searchParams.set('sortedBy', sort);
              currentUrl.searchParams.set('orderedBy', order);
              currentUrl.searchParams.set('category', Category);
            console.log(currentUrl);
            navigate(currentUrl.search);
            setLoading(false)
})
.catch((err) => {
  console.log(err)
  setErr(err)
  setLoading(false)
})  
    }, [order, sort, Category]);  
  if(err) return <h2>{err}</h2>
  if(reviews === undefined) return <h2>no review here</h2>
 if(loading) return <h2>loading...</h2>
else{
return <ul>{reviews.map((review) => {
return <li className="reviews" key={review['review_id']}> 
<Link to={`/reviews/${review.review_id}`}>
       <BsBook />
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
<div className="sorter">
<Sortby onChange={handleSortChange} />
<Orderby onChange={handleOrderChange} />
<CategorySort onChange={handleCategoryChange} />
</div>
</ul>
}
}
export default Reviewlist
