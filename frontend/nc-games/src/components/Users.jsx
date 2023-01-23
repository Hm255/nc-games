import {useState, useEffect, useContext} from "react";
import { getUsers } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { AiFillFastBackward } from "react-icons/ai";

const Users = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
   // const [user, setUser] = useState('')
    const {user, setUser} = useContext(UserContext);

    // const { user } = useContext(UserContext); 
useEffect(()=> {
    getUsers()
    .then((allUsers)=>{
        setUsers(allUsers.users)
        console.table(allUsers.users)
        console.log()
    })
    setLoading(false)
}, [])

const toReviews = (event) => {
    navigate("/reviews");
};




if(loading) return <h2>loading...</h2>
else{
    return <ul>
        <Link to={`/`}>
       <p>back to home</p> <AiFillFastBackward />
        </Link>
        <div>{user ? (<button className="loginButton" onClick={(event)=>{toReviews()}}>login as {user}</button>)
        :('')}</div>
        {users.map((user) => {
            return <li className="users">
                <div className="user">
                <br></br>
                <p className="userAvatar">Avatar:</p><img src={user.avatar_url} className="userImg" alt="img"></img>
                <br></br>
                <p className="name">name:</p>{user.name}
                <br></br>
                <p className="userName">username:</p>{user.username}
                <br></br>
              <button onClick={(event) => setUser(user.username)}>select {user.username}</button>
                </div>
            </li>
        })}
    </ul>
} 
}

export default Users
//reviews come up undefined
//set user to become the user context user