import * as React from "react";
import { commentVote, editReview } from '../api';
import {useContext, useState, useEffect, useCallback} from "react";
import { UserContext } from './UserContext';   


class Comment extends React.Component {
  static contextType = UserContext;
   constructor(props) {
     super(props);
     this.state = {
       author: props.author,
       comment_id: props.comment_id,
       body: props.body,
       review_id: props.review_id,
       votes: props.votes,
       created_at: props.created_at,
       liked: props.liked,
       disliked: props.disliked,
     };
     
     this.toggleLike = this.toggleLike.bind(this);
     this.toggleDislike = this.toggleDislike.bind(this);
     console.log(this, this._reactInternals)
   }
   toggleLike = () => {
      this.setState((state) => ({
        liked: !state.liked,
        disliked: false
      }));
      if(this.state.disliked){
        inc_votes = this.state.liked ? {inc_votes: -1} : {inc_votes: +1};
        commentVote(inc_votes, this.state.comment_id).then((res) => {
         console.log(res.comment)
         return res.data;
     })
        console.log('dislike to like')
     }
      let inc_votes = this.state.liked ? {inc_votes: -1} : {inc_votes: +1};
      commentVote(inc_votes, this.state.comment_id).then((res) => {
         console.log(res.comment)
         return res.data;
     })
     console.log(this.state.liked)
    }

   toggleDislike = () => {
      this.setState((state) => ({
        liked: false,
        disliked: !state.disliked
      }));
      if(this.state.liked){
         inc_votes = this.state.disliked ? {inc_votes: +1} : {inc_votes: -1};
         commentVote(inc_votes, this.state.comment_id).then((res) => {
          console.log(res.comment)
          return res.data;
      })
         console.log('like to dislike')
      }
      let inc_votes = this.state.disliked ? {inc_votes: +1} : {inc_votes: -1};
      commentVote(inc_votes, this.state.comment_id).then((res) => {
         console.log(res.comment)
         return res.data;
     })
     console.log(this.state.disliked)
    }

   render() {
      const { user } = this.context;
     if(user){ 
     return (
       <div>
         <p>{this.state.body}</p>
         <button onClick={() => this.toggleLike()}>Like</button>
         <button onClick={() => this.toggleDislike()}>Dislike</button>
         <p>{`Liked: ${this.state.liked}, Disliked: ${this.state.disliked}`}</p>
       </div>
     );
   }
   }
 }
 export default Comment
//live rendering needed