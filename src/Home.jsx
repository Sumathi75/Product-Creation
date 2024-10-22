import { Link } from "react-router-dom";
import "./Home.css"

function Home() {
  return (
    <div className="home_body">
      <h1>Product Management</h1>
      <p>
        Click the below link to create a new product using the dynamic form.
      </p>
      <Link to="/create-product" className="link">Go to Product Creation Form</Link>
    </div>
  );
}

export default Home;
