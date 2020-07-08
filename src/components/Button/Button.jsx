import React from "react";
import "./Button.scss";

const Button = ({ onClickAction, title }) => {
  return (
    <>
      <button className="counter-button" onClick={onClickAction}>
        {title}
      </button>
    </>
  );
};

export default Button;
