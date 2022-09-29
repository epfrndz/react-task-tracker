import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Link to="/">Home</Link>
      <Link to="/completed">Completed Tasks</Link>
      <Link to="/about">About</Link>
      <p>Copyright &copy; 2021</p>
    </footer>
  );
};

export default Footer;
