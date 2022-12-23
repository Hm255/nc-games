import { useState, useEffect } from "react";
import React from 'react';
import  {useNavigate} from "react-router-dom";
import { getReviews } from "../api";

export default function Sortby(props){
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('');
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    const orderByList = props.options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ));

      const handleChange = (event) => {
        setSelectedSort (selectedSort);
        setSelectedOrder(event.target.value);
        return false;
      };

   

      useEffect(() => {
        const currentUrl = new URL(window.location.href);
        getReviews(selectedSort, selectedOrder)
          .then((response) => {
            setSelectedOrder(selectedOrder)
            currentUrl.searchParams.set('orderedBy', selectedOrder);
            setReviews(response);
            navigate(currentUrl.search);
            console.log(currentUrl)
            console.log(response)
          })
          .catch(error => {
            console.error(error);
          });
      }, [selectedSort, selectedOrder]);

      return (
        <div>
        <select value={selectedOrder} onChange={handleChange}>
          {orderByList}
        </select>
        </div>
      );
    };


  