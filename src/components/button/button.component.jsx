import React from "react";
import { SpinnerContainer } from "../spinner/spinner.styles.jsx";

import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, isLoading, ...btnAttributes }) => {
  return (
    <button
      disabled={isLoading}
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...btnAttributes}
    >
      {isLoading ? <SpinnerContainer /> : children}
    </button>
  );
};

export default Button;
