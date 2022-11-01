import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Reviewlist from "./components/Reviewlist";
import Categories from "./components/Categories";
function App() {
  

  return (
    <BrowserRouter>
    <div className="App">
          <Routes>
            <Route path="/Welcome" element={<Welcome />} />
            <Route path="/reviewList" element={<Reviewlist />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
