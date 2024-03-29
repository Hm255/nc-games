import {useState, useEffect, useContext} from "react";
import { getUsers } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { AiFillFastBackward } from "react-icons/ai";
import React from "react";
const Users = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const {user, setUser} = useContext(UserContext);

useEffect(()=> {
    getUsers()
    .then((allUsers)=>{
        setUsers(allUsers.users)
        console.log(UserContext)
    })
    setLoading(false)
}, [])


if(loading) return <h2>loading...</h2>
else{
    return <ul>
        <Link to={`/`}>
       <p>back to home</p> <AiFillFastBackward />
        </Link>
        <div>{user ? (<button className="loginButton" onClick={(event)=>{navigate(-1)}}>login as {user}</button>)
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