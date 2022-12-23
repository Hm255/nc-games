import { useState, useEffect } from "react";
import React from 'react';
import  {useNavigate} from "react-router-dom";
import { getReviews } from "../api";
const currentUrl = new URL(window.location.href);
const SortbyOrderby = () => {
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [reviews, setReviews] = useState([]);
const navigate = useNavigate();

    const Sort = [
        { value: 'review_id', label: 'Review ID' },
        { value: 'Votes', label: 'Vote count' },
        { value: 'created_at', label: 'recent' },
        { value: 'comment_count', label: 'comment count' }
      ];
    
    const Order = [{value: 'asc', label: 'ascending order'}, 
                    {value: 'desc', label: 'descending order'}
                ];
    const sortByList = Sort.map((option) => (
        <option value={option.value}>{option.label}</option>
      ));

      const orderByList = Order.map((option) => (
        <option value={option.value}>{option.label}</option>
      ));

    const handleChange = (event) => {
        if(event.target.name === 'Sorted'){
            setSort(event.target.value)
        }
        else if(event.target.name === 'Ordered'){
            setOrder(event.target.value)
        }
      };

      useEffect(() => {
        getReviews(sort, order)
          .then((response) => {
            setReviews(response);
             currentUrl.searchParams.set('sortedBy', sort);
            currentUrl.searchParams.set('orderedBy', order);
            navigate(currentUrl.search);
            console.log(response)
          })
          .catch(error => {
            console.error(error);
          });
      }, [sort, order]);
      return (
        <div>
        <select name='Sorted' id='sortBy' options={Sort} onChange={handleChange}>
          {sortByList}
        </select>
        <select name='Ordered' id='orderBy' options={Order} onChange={handleChange}>
          {orderByList}
        </select>
        </div>
      );
  }

export default SortbyOrderby