import React from "react";
import {useNavigate, Link} from "react-router-dom";


export default function Navigation () {

    const navigate = useNavigate();

    const toReviews = (event) => {
        event.preventDefault();
        navigate("/reviewList");
    };
    // const toCategories = (event) => {
    //     event.preventDefault();
    //     navigate("/Categories/");
    // };


    return (<div>
        <h1>Welcome to NC games</h1>
        <Link to="/reviewList">
        <button onClick={toReviews}>Reviews</button>
        </Link>
        {/* <Link to="/Categories">
        <button onClick={toCategories}>Categories</button>
        </Link> */}
    </div>
    )
}

