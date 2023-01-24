import * as React from 'react';
import {useState, useEffect, useContext} from "react";
import { getReviews } from "../api";
import {Link, useNavigate} from "react-router-dom";
import Sortby from './Sortby';
import Orderby from './Orderby';
import CategorySort from './CategorySort';
import { UserContext } from "./UserContext";
import { AiFillFastBackward, AiOutlineUserSwitch } from "react-icons/ai";

const currentUrl = new URL(window.location.href);

    const Reviewlist = (props)=>{
    const [reviews, setReviews] = useState([]); 
    const { user } = useContext(UserContext); 
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState('desc');     //sets the order
    const [sort, setSort] = useState('created_at'); //sets the sorted variable
    const [err, setErr] = useState(null)
    const [errFix, setErrFix] = useState (null)
    const [errMsg, setErrMsg] = useState(null);
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
      const handleReviewClick = (event, review_id) => {
        console.log(review_id)
        navigate(`/reviews/${review_id}`)
      }

    useEffect(()=>{ 
        getReviews(sort, order, Category)
        .then((data) => {
          if(!data.ok){
            console.table(data)
          }
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
return <ul>
  <h2>{user}</h2>
  <Link to={`/`}>
       <p>back to home</p> <AiFillFastBackward />
        </Link>
        <Link to={`/users`}>
       <p>change user</p> <AiOutlineUserSwitch />
        </Link>
  <div className="sorter">
Sort by:<Sortby onChange={handleSortChange} />
order by:<Orderby onChange={handleOrderChange} />
category:<CategorySort onChange={handleCategoryChange} />
</div>
{reviews.map((review) => {
return <li className="reviews" onClick={(event, review_id) => {handleReviewClick(event, review.review_id)}} key={review['review_id']}> 
<br></br>
<p className="title">Title:</p>{review.title}
<br></br>
<p className="category">Category:</p>{review.category}
<br></br>
<p className="votes">Votes:</p>{review.votes}
</li> 
})
}
</ul>
}
}
export default Reviewlist
