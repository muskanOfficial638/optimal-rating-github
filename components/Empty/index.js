import React from "react";
import { Empty } from "antd";

const EmptyFile = ({
  className = "",
  children,
  isEmpty = true,
  text = "",
  description,
  emptyChild,
}) => {
  return isEmpty ? (
    text ? (
      <div className={`text-grey text-center ${className}`}>{text}</div>
    ) : (
      <Empty className={className} description={description}>
        {emptyChild}
      </Empty>
    )
  ) : children ? (
    children
  ) : null;
};
export default EmptyFile;
