import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-purple text-dark text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-info mt-auto py-3">
      <div className="container-fluid bg-primary text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg" onClick={()=>(alert("9489159907"))}>Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-dark">E-Commerce</span> Website
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
