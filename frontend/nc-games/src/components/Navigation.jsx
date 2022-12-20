import React from "react";
import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";


export default function Navigation () {
    const [name, setName] = useState('user');
    const navigate = useNavigate();

    const toReviews = (event) => {
        event.preventDefault();
        navigate("/Reviewlist");
    };
    const toCategories = (event) => {
        event.preventDefault();
        navigate("/Categories");
    };
    const toAPI = (event) => {
        event.preventDefault();
        navigate("/api");
    };


    return (
    <div>
        <h1>Welcome to NC games {name}</h1>
        <Link to="/Reviewlist">
        <button handleClick={toReviews}>Reviews</button>
        </Link>
        <Link to="/Categories">
        <button handleClick={toCategories}>Categories</button>
        </Link>
        <Link to="/api">
        <button handleClick={toAPI}>API</button>
        </Link>
    </div>
    )
}

