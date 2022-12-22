import { useState, useEffect } from "react";
import React from 'react';
import  {useParams, Link, useNavigate} from "react-router-dom";
import { getReviews } from "../api";

export default function Sortby(props){
    const [selectedSort, setSelectedSort] = useState('comment_count');
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    const sortByList = props.options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ));

      const handleChange = (event) => {
        setSelectedSort(event.target.value);
        return false;
      };

    const updateUrl = () => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('sortedBy', selectedSort);
        console.log(currentUrl);
        navigate(currentUrl.search);
      }

      useEffect(() => {
        getReviews(selectedSort)
          .then((response) => {
            setReviews(response);
            console.log(response)
          })
          .catch(error => {
            console.error(error);
          });
      }, [selectedSort]);

      return (
        <div>
        <select value={selectedSort} onChange={handleChange}>
          {sortByList}
        </select>
        <button onClick={updateUrl}>Sort by {selectedSort}</button>
        </div>
      );
    };


  