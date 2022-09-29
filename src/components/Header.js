import PropTypes from "prop-types";
import Button from "./Button";
import React from "react";
import { useLocation } from "react-router-dom";

const Header = (props) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{props.title}</h1>
      {location.pathname === "/" && (
        <Button
          color={props.showAddTask ? "#FF7260" : "#63B4FF"}
          text={props.showAddTask ? "Close" : "Add"}
          onClick={props.onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
