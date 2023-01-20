import './App.css';
import {useState} from "react";
import { getAllComments } from './api';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./components/UserContext";
import {CommentContext} from "./components/CommentContext"
import Welcome from "./components/Welcome";
import ErrorPage from './components/ErrorPage';
import Reviewlist from "./components/Reviewlist";
import Categories from "./components/Categories";
import SingleReview from "./components/SingleReview";
import React from 'react';
function App() {
  const [user, setUser] = useState("cooljmessy"); //username set here
  const [AllComments, setAllComments] = useState(getAllComments())
  return (
    <UserContext.Provider value={{ user }}>
      <CommentContext.Provider value={{AllComments, setAllComments}}>
    <BrowserRouter>
    <div className="App">
          <Routes>
             <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/Reviewlist" element={<Reviewlist />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/reviews/:review_id" element={[<SingleReview />]}/>
            <Route path="/reviews/:review_id/:comment"/>
          </Routes>
    </div>
    </BrowserRouter>
    </CommentContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
