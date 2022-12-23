import { useState, useEffect } from "react";
import React from 'react';
import  {useNavigate} from "react-router-dom";
import { getReviews } from "../api";

export default function Sortby(props){
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('');
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    const sortByList = props.options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ));

      const handleChange = (event) => {
        setSelectedSort(event.target.value);
        return false;
      };

      useEffect(() => {
        const currentUrl = new URL(window.location.href);
        getReviews(selectedSort, selectedOrder)
          .then((response) => {
            setSelectedSort(selectedSort)
            currentUrl.searchParams.set('sortedBy', selectedSort);
            setReviews(response);
            navigate(currentUrl.search);
            console.log(response)
          })
          .catch(error => {
            console.error(error);
          });
      }, [selectedSort, selectedOrder]);

      return (
        <div>
        <select value={selectedSort} onChange={handleChange}>
          {sortByList}
        </select>
        </div>
      );
    };


  