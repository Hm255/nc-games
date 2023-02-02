import './App.css';
import {useState} from "react";
import { getAllComments } from './api';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./components/UserContext";
import {CommentContext} from "./components/CommentContext"
import Users from './components/Users';
import Welcome from "./components/Welcome";
import ErrorPage from './components/ErrorPage';
import Reviewlist from "./components/Reviewlist";
import Categories from "./components/Categories";
import SingleReview from "./components/SingleReview";
import React from 'react';
import Commentlist from './components/Commentlist';
import { CategoryContext } from './components/CategoryContext';

function App (props) {
  const [user, setUser] = useState(); //username set here
  const [AllComments, setAllComments] = useState(getAllComments())
  const [category, setCategory] = useState()//category set here
    console.log(category, CategoryContext)
    console.log(user, UserContext)
  
  return (
    <CategoryContext.Provider value={{category, setCategory}}>
    <UserContext.Provider value={{ user, setUser }}>
      <CommentContext.Provider value={{AllComments, setAllComments}}>
    <BrowserRouter>
    <div className="App">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/reviews" element={<Reviewlist />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
            <Route path="/reviews/:review_id" element={<SingleReview />}/>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/reviews/:review_id/:comment" element={<Commentlist />}/>
          </Routes>
    </div>
    </BrowserRouter>
    </CommentContext.Provider>
    </UserContext.Provider>
    </CategoryContext.Provider>
  );
}

export default App;
