import React from "react";
import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";


export default function Navigation () {
    const [name, setName] = useState('user');
    const navigate = useNavigate();

    const toReviews = (event) => {
        event.preventDefault();
        navigate("/reviewlist");
    };
    // const toCategories = (event) => {
    //     event.preventDefault();
    //     navigate("/Categories/");
    // };


    return (<div>
        <h1>Welcome to NC games {name}</h1>
        <Link to="/reviewlist">
        <button onClick={toReviews}>Reviews</button>
        </Link>
        {/* <Link to="/Categories">
        <button onClick={toCategories}>Categories</button>
        </Link> */}
    </div>
    )
}

