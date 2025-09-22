import * as React from "react";
import { commentVote } from '../api';
import {useState, useCallback} from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

const Comment = (props) => {
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
    {!state.liked && !state.disliked ?<button className="commentLike" onClick={toggleLike}>Like</button>:('')}
    {state.liked && !state.disliked ? <button className="commentLiked" onClick={toggleLike}><AiFillLike /></button>:('')}
    {!state.liked && !state.disliked ?<button className="commentDislike" onClick={toggleDislike}>Dislike</button>:('')}
    {!state.liked && state.disliked ? <button className="commentDisliked" onClick={toggleDislike}><AiFillDislike /></button>:('')}
  </ul>
};
 export default Comment
//live rendering needed