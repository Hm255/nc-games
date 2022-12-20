import React, {useState, useEffect} from "react";
import { getComment } from "../api";
import { useParams, Link } from "react-router-dom";
import Sortby from "./Sortby";
import Orderby from "./Orderby";

    const Reviewlist = ()=>{
    const [comment, setComment] = useState([]);
    const [sortedBy, setSort] = useState('created_at');
    const [orderedBy, setOrder] = useState('desc');
    const [loading, setLoading] = useState(true);
        const {category} = useParams()
        
    useEffect(()=>{ 
        getComment(sortedBy, orderedBy)
        .then((data) => {
            console.log([data, sortedBy, orderedBy, category])
            setOrder(orderedBy)
            setSort(sortedBy)
            setComment(data.comment); 
            setLoading(false);
})
    }, [sortedBy, orderedBy, category]);

 if(loading) return <h2>loading...</h2>
else{
return <ul>{comment.map((comment) => {
return <li className="comment" key={comment['comment_id']}> 
<Link to={`/comments/${comment.comment_id}`}>
       {comment.comment_id}
       </Link>
<br></br>
<p className="user">User:</p>{comment.author}
<br></br>
<p className="comment">Comment:</p>{comment.body}
<br></br>
<p className="votes">Votes:</p>{comment.votes}
<br></br>
<p className="created_at">Created at:</p>{comment.created_at}</li> 
})}
<div>
<Sortby />
<Orderby />    
</div>
</ul>
}
}

export default Comment


