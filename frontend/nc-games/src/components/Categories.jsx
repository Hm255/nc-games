import React, { useEffect, useState } from "react";
import * as api from "../api";
import Category from "./Category";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getCategories().then(({ categories }) => {
      setCategories(categories);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) return <h2>loading...</h2>;
  return (
    <ul>
      {categories.map((category) => {
        return <li className="categories" key={category['category']}> 
        <p className="categoryName">Category:</p><p className="catName">{category['slug']}</p>
        <p className="categoryDesc">description:</p><p className="catDesc">{category['description']}</p>
        </li> ;
      })}
    </ul>
  );
}