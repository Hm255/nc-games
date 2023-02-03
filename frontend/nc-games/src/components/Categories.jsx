import React, { useEffect, useState, useContext } from "react";
import * as api from "../api";
import {Link, useNavigate} from "react-router-dom";
import { CategoryContext } from "./CategoryContext";
import { AiFillFastBackward, AiOutlineUserSwitch } from "react-icons/ai";
export default function Categories(props) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState('')
  const {category, setCategory} = useContext(CategoryContext);
  const navigate = useNavigate()
  console.log(CategoryContext)

  const handleCategoryClick = (event, slug) => {
    event.preventDefault()
    console.log(slug)
    setCategory(slug)
    navigate(`/reviews/?sortedBy=created_at&orderedBy=desc&category=${slug}`)
  }
  
  useEffect(() => {
    api.getCategories().then(({ categories }) => {
      console.log()
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
       <Link to={`/`}>
       <p>back to home</p> <AiFillFastBackward />
        </Link>
        <Link to={`/users`}>
       <p>change user</p> <AiOutlineUserSwitch />
        </Link>
      {categories.map((category) => {
        return  <li className="categories" onClick={(event, slug) => {handleCategoryClick(event, category.slug)}} key={category['slug']}> 
        <p className="categoryName">Category:</p><p className="catName">{category['slug']}</p>
        <p className="categoryDesc">description:</p><p className="catDesc">{category['description']}</p>
        </li> 
      })}
    </ul>
  );
}