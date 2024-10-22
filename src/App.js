import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home"; 
import ProductCreationForm from "./ProductCreationForm"; 
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]); 

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/create-product" element={<ProductCreationForm addProduct={addProduct} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
