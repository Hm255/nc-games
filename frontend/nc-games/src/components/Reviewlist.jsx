import * as React from 'react';
import {useState, useEffect, useContext} from "react";
import { getReviews } from "../api";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import Sortby from './Sortby';
import Orderby from './Orderby';
import CategorySort from './CategorySort';
import { UserContext } from "./UserContext";
import { AiFillFastBackward, AiOutlineUserSwitch } from "react-icons/ai";
import { CategoryContext } from './CategoryContext';

const currentUrl = new URL(window.location.href);

    const Reviewlist = (props)=>{
    const [reviews, setReviews] = useState([]); 
    const { user } = useContext(UserContext); 
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState('desc');     //sets the order
    const [sort, setSort] = useState('created_at'); //sets the sorted variable
    const [error, setError] = useState(null)
    const [errFix, setErrFix] = useState (null)
    const [errMsg, setErrMsg] = useState(null);
    const [Category, setCategory] = useState('')//setting useContext here causes maximum call stack size exceeded error due to infinite re-rendering
    //const {Category, setCategory} = useContext(CategoryContext) //currently gives undefined category and locks category
    const navigate = useNavigate();
    console.log(Category, CategoryContext)
    console.log(user, UserContext)
//set queries to only be what can be selected
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
          //console.table(data.reviews)
          if(data === undefined){
            setError(404)
              setErrMsg('reviews dont exist')
              setErrFix('search for existing reviews')
            console.table(data)
          }
            setReviews(data.reviews); 
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
  setLoading(false)
})  
    }, [order, sort, Category]);  
    if(error) return <ul>{<h2 className="errorMessage">{error}: {errMsg}, <br></br>fix: {errFix}</h2>}</ul>
  if(reviews === undefined) return <div className='hardErrMsg'><h2> 404: found no reviews, make sure url params are correct as shown below:<p>('?sortedBy=created_at&orderedBy=desc&category=')</p></h2></div>
 if(loading) return <h2>loading...</h2>
else{
return <ul>
  
  <h2 className='username'>{user}</h2>
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
<div className='wrapper'>
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
</div>
</ul>
}
}
export default Reviewlist
