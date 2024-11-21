import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-red-400 font-semibold px-10 py-3 rounded-lg text-white"
    >
      {children}
    </button>
  );
};

export default Button;
