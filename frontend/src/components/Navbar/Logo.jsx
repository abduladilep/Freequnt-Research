// import React from 'react'
import { Link } from "react-router-dom";
import "./Logo.css";
function Logo() {
  return (
    <div className="navbar">
      <div className="haeader ">
        <h1 className="custom-h3">FREQUENT- RESEARCH</h1>
      </div>
      <div>
        <h3>Frequent Research Fieldwork Solution Pvt.Ltd</h3>
      </div>

      <div className="buttons mt-4">
        <Link to="/users">
          <button>Go to Client Directory</button>
        </Link>
      </div>
    </div>
  );
}

export default Logo;
