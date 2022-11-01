import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as api from "./api"
import Welcome from "./components/Welcome";
import Reviewlist from "./components/Reviewlist";
//import Categories from "./components/Categories";
function App() {
  
  const [user, setUser] = useState('user');
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(()=>{ 

  }, []);


  return (
    <BrowserRouter>
    <div className="App">
          <Routes>
            <Route path="/Welcome" element={<Welcome />} />
            <Route path="/reviewList" element={<Reviewlist />} />
          </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
