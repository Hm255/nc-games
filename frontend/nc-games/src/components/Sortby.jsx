import { useState, useEffect } from "react";
import React from 'react';
import  {useParams, Link} from "react-router-dom";
import { getReviews } from "../api";



export default function Orderby(props){
    const [selectedSort, setSelectedSort] = useState('');
    const sortBy = props.options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ));

      const handleChange = (event) => {
        setSelectedSort(event.target.value);
        console.log(event.target.value);
      };
    
      return (
        <div>
        <select value={selectedSort} onChange={handleChange}>
          {sortBy}
        </select>
        </div>
      );
    };


