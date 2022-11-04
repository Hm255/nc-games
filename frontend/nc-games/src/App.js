import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Reviewlist from "./components/Reviewlist";
import Categories from "./components/Categories";
import SingleReview from "./components/SingleReview";
function App() {
  

  return (
    <BrowserRouter>
    <div className="App">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/Reviewlist" element={<Reviewlist />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/Reviewlist/:category" element={<Reviewlist />}/>
            <Route path="/Reviewlist/review/:review_id" element={<SingleReview />}/>
            <Route path="/Reviewlist/review/:review_id/comments" element={<SingleReview />}/>
          </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
