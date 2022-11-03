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
            <Route path="/" element={<Welcome />} />
            <Route path="/reviewlist" element={<Reviewlist />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reviewlist/:category" element={<Reviewlist />}/>
          </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
