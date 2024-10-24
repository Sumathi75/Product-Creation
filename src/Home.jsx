import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home({ products, deleteProduct }) {
  return (
    <div className="home_body">
      <div className="home_content">
        <h1>Product Management</h1>
        <p>Click the below link to create a new product using the dynamic form.</p>
        <Link to="/create-product" className="link">Create Product</Link>
      </div>
      <div className="home_table">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>
                  <Link to={`/view/${product.id}`}>
                      <button>View</button>
                    </Link>
                    <Link to={`/edit/${product.id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
