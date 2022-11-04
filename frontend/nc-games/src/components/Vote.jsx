import { useState, React } from "react";
import { patchVotes } from "../api";
import {useParams} from "react-router-dom";


export default function Vote(props) {
  const [voteCount, setVoteCount] = useState(props.votes)
  const {review_id} = useParams()
//get votes from props(currVotes)
//pressing our button needs to increment the vote count (sort of working)
//make an api request that increments vote count using the .patch function

  const handleVoteClick = () => {
    setVoteCount((currVotes) => currVotes + 1);
    patchVotes(review_id).catch(() => setVoteCount((currVotes) => currVotes - 1)
  )};
  return(
    <div> <p className="votes">Votes:</p>{voteCount}
    <br></br>
        <button onClick={handleVoteClick}>Like Button</button>
    </div>
  )
}