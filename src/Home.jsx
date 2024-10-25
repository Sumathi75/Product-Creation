import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home({ products, deleteProduct, editProduct }) {
  return (
    <div className="home_body ">
      <div className="home-content">
        <h1>Dynamic Product Creation Form</h1>
        <div className="sub-row">
          <h3 className="p-list">Product List</h3>
          <Link to="/create-product" className="link">
            Create New Product
          </Link>
        </div>
        <div className="table-content">
          <table>
            <thead>
              <tr className="col-12">
                <th className="col-6">Title</th>
                <th className="col-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>
                    <Link to={`/view/${product.id}`} >
                      <button className="btns">view</button>
                    </Link>
                    <Link to={`/edit/${product.id}`} >
                      <button className="btns mx-3">Edit</button>
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="btns"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
