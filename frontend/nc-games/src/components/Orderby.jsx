import { useState, useEffect } from "react";
import React from 'react';
import  {useParams, Link} from "react-router-dom";
import { getReviews } from "../api";



export default function Orderby(props){
    const [selectedOrder, setSelectedOrder] = useState('');
    const orderBy = props.options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ));

      const handleChange = (event) => {
        setSelectedOrder(event.target.value);
        console.log(event.target.value);
      };
    
      return (
        <div>
        <select value={selectedOrder} onChange={handleChange}>
          {orderBy}
        </select>
        </div>
      );
    };



