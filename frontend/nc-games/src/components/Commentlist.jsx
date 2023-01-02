import * as React from 'react';
import {useState, useEffect} from "react";
import { getComments } from "../api";
import {Link, useNavigate, useParams} from "react-router-dom";
const currentUrl = new URL(window.location.href);

    const Commentlist = ()=>{
    const {review_id} = useParams()
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{ 
        getComments(review_id)
        .then((data) => {
            setComments([data]);
            console.log(data); 
            navigate(currentUrl.search);
            setLoading(false);
})
    }, [review_id]);  

 if(loading) return <h2>loading...</h2>
else if (!comments){
return <p className='noComments'> no comments </p>
}
else {
return <ul>{comments.map((comment) => {
return <li className="comments" key="{comment}"> 
<Link to={`reviews/${review_id.review_id}/${comment.comment_id}`}>
       {comment.comment_id}
       </Link>
<br></br>
<p className="Author">Author:</p>{comment.author}
<br></br>
<p className="comment-body">Body:</p>{comment.body}
<br></br>
<p className="commentVotes">Votes:</p>{comment.votes}
<br></br>
<p className="comment-created-at">Made:</p>{comment.created_at}
</li> 
})
}
</ul>
}
}
export default Commentlist