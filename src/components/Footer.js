import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2021</p>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/completed">Completed Tasks</Link>
    </footer>
  );
};

export default Footer;
