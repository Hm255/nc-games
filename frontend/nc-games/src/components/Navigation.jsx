import React from "react";
import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";


export default function Navigation () {
    const [name, setName] = useState('user');
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
    <div>
        <h1>Welcome to NC games {name}</h1>
        <Link to="/reviews">
        <button handleClick={toReviews}>Reviews</button>
        </Link>
        <Link to="/Categories">
        <button handleClick={toCategories}>Categories</button>
        </Link>
        <Link to="/users">
        <button handleClick={toUsers}>Select user</button>
        </Link>
    </div>
    )
}

