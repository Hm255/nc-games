import React, { useEffect, useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import * as api from "../api";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState('')
  const navigate = useNavigate();




  useEffect(() => {
    api.getCategories().then(({ categories }) => {
      setCategories(categories);
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setErr(err)
      setIsLoading(false)
  })  
  }, []);
  if(err)return<h2>{err}</h2>
  if (isLoading) return <h2>loading...</h2>;
  return (
    <ul>
      {categories.map((category) => {
        return  <li className="categories" key={category['slug']}> 
        <p className="categoryName">Category:</p><p className="catName">{category['slug']}</p>
        
       <Link to={`/Reviewlist?Category=${category.slug}`}>
       {category.slug}
       </Link>

        <p className="categoryDesc">description:</p><p className="catDesc">{category['description']}</p>
        </li> 
  
      })}
    </ul>
  );
}