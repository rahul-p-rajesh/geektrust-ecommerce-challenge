import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";

import "./App.css";

function App() {

  return (
    <div className="App ">
      <Router>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route exact path="/" element={<Products />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
