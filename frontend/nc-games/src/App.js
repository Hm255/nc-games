import './App.css';
import navigation from "./components/navigation";
import Reviews from "./components/Review";
import reviewList from "./components/reviewList";
import Categories from "./components/Categories";
function App() {
  return (
    <div className="App">
   <h2>Welcome to NC games</h2>
   <Routes>
            <Route path="/" element={<Home />} />
            <div>
            <navigation/ >
            </div>
            <Route path="/Review" element={<Reviews />} />
            <Route path="/reviewList" element={<reviewList />} />
            <Route path="/Categories" element={<Categories />} />
          </Routes>
    </div>
  );
}

export default App;
