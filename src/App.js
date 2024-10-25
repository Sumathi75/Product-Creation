import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ProductCreationForm from "./ProductCreationForm";
import Edit from "./Edit";
import View from "./View";

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, { id: Date.now(), ...product }]);
  };

  const editProduct = (id, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          }
        />
        <Route
          path="/create-product"
          element={<ProductCreationForm addProduct={addProduct} />}
        />
        <Route
          path="/edit/:id"
          element={<Edit products={products} editProduct={editProduct} />}
        />
        <Route path="/view/:id" element={<View products={products} />} />
      </Routes>
    </Router>
  );
}

export default App;
