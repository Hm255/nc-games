import './App.css';
import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./components/UserContext";
import Welcome from "./components/Welcome";
import Reviewlist from "./components/Reviewlist";
import Categories from "./components/Categories";
import SingleReview from "./components/SingleReview";
import React from 'react';
function App() {
  const [user, setUser] = useState("cooljmessy"); //username set here

  return (
    <UserContext.Provider value={{ user }}>
    <BrowserRouter>
    <div className="App">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/Reviewlist" element={<Reviewlist />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/reviews/:review_id" element={<SingleReview />}/>
            <Route path="/reviews/:review_id/:comment" />
          </Routes>
    </div>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
