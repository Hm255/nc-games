import React from "react";
import {useNavigate, Link} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Navigation () {
    const { user } = useContext(UserContext); 
    const navigate = useNavigate();

    const toReviews = (event) => {
        event.preventDefault();
        navigate("/reviews");
    };
    const toCategories = (event) => {
        event.preventDefault();
        navigate("/Categories");
    };
    const toUsers = (event) => {
        event.preventDefault();
        navigate("/users");
    };


    return (
    <div className="welcomePage">
        <div className='wrapper'>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <div><span class="dot"></span></div>
        <h1 className="welcomeTitle">Welcome to NC games {user}</h1>
        <Link to="/reviews">
        <button handleClick={toReviews} className="reviewEntry">Reviews</button>
        </Link>
        <Link to="/Categories">
        <button handleClick={toCategories} className="categoryEntry">Categories</button>
        </Link>
        <Link to="/users">
        <button handleClick={toUsers} className="userEntry">Select user</button>
        </Link>
        </div>
    </div>
    )
}

