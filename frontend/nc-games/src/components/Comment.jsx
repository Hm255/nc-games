import * as React from "react";
import { commentVote, editReview, getComment, getComments } from '../api';
import {useState, useEffect, useCallback} from "react";
import {useParams} from "react-router-dom";
const Comment = (props) => {
  const {review_id} = useParams()                
  const [state, setState] = useState({
    author: props.author,
    comment_id: props.comment_id,
    body: props.body,
    review_id: props.review_id,
    votes: props.votes,
    created_at: props.created_at,
    liked: props.liked,
    disliked: props.disliked,
  });

  const toggleLike = useCallback(() => {
    setState((state) => ({
      ...state,
      liked: !state.liked,
      disliked: false,
    }));
    if (state.disliked) {
      const inc_votes = state.liked ? { inc_votes: -1 } : { inc_votes: +1 };
      commentVote(inc_votes, state.comment_id).then((res) => {
        const { votes } = res.comment.votes;
        setState((state) => ({
          ...state,
          votes,
        }));
        console.log(res.comment);
        props.onUpdate(res.comment);
      return res.data;
      });
    }
    const inc_votes = state.liked ? { inc_votes: -1 } : { inc_votes: +1 };
    commentVote(inc_votes, state.comment_id).then((res) => {
      const { votes } = res.comment.votes;
      setState((state) => ({
        ...state,
        votes,
      }));
      console.log(res.comment);
      props.onUpdate(res.comment);
      return res.data;
    });
    console.log(state.liked);
  }, [state.liked, state.disliked])


  const toggleDislike = useCallback(() => {
    setState((state) => ({
      ...state,
      liked: false,
      disliked: !state.disliked,
    }));
    if (state.liked) {
      const inc_votes = state.disliked ? { inc_votes: +1 } : { inc_votes: -1 };
      commentVote(inc_votes, state.comment_id).then((res) => {
        const { votes } = res.comment.votes;
        setState((state) => ({
          ...state,
          votes,
        }));
        console.log(res.comment);
        props.onUpdate(res.comment);
      return res.data;
      });
    }
    const inc_votes = state.disliked ? { inc_votes: +1 } : { inc_votes: -1 };
    commentVote(inc_votes, state.comment_id).then((res) => {
      const { votes } = res.comment.votes;
      setState((state) => ({
        ...state,
        votes,
      }));
      console.log(res.comment);
      props.onUpdate(res.comment);
      return res.data;
    });
  }, [state.liked, state.disliked])

  return <ul>
    <button onClick={toggleLike}>Like</button>
    <button onClick={toggleDislike}>Dislike</button>
  </ul>
};
 export default Comment
//live rendering needed