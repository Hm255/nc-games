import { useState, useEffect } from "react";
import React from 'react';
import  {useParams, Link, useNavigate, useLocation} from "react-router-dom";
import { getReviews } from "../api";

export default function Orderby(props){
    const [selectedOrder, setSelectedOrder] = useState('Desc');
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    const orderByList = props.options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ));

      const handleChange = (event) => {
        setSelectedOrder(event.target.value);
        return false;
      };

    const updateUrl = () => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('orderedBy', selectedOrder);
        console.log(currentUrl);
        navigate(currentUrl.search);
      }

      useEffect(() => {
        getReviews(selectedOrder)
          .then((response) => {
            setReviews(response);
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
      }, [selectedOrder]);

      return (
        <div>
        <select value={selectedOrder} onChange={handleChange}>
          {orderByList}
        </select>
        <button onClick={updateUrl}>Order by {selectedOrder}</button>
        </div>
      );
    };

