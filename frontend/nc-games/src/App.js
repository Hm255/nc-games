import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Reviewlist from "./components/Reviewlist";
import Categories from "./components/Categories";
import SingleReview from "./components/SingleReview";
import Comment from "./components/Comment";
function App() {
  

  return (
    <BrowserRouter>
    <div className="App">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/Reviewlist" element={<Reviewlist />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/reviews/:review_id" element={<SingleReview />}/>
            <Route path="/reviews/:review_id/:comment" element={<Comment />}/>
          </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
