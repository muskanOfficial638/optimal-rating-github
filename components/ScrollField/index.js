import React from "react";

const ScrollField = ({
  children,
  maxHeight = "",
  height = "",
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`ScrollField ${className}`}
      style={{ maxHeight, height, ...style }}
    >
      {children}
    </div>
  );
};
export default ScrollField;
