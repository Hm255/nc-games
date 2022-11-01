import React, { useEffect, useState } from "react";
import * as api from "../api";
import Category from "./Category";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.getCategories().then(({ categories }) => {
      setCategories(categories);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) return <h2>loading...</h2>;
  return (
    <ul>
      {categories.map((category) => {
        return <Category key={category.category_name} category={category} />;
      })}
    </ul>
  );
}