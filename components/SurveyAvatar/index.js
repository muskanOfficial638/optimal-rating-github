import React, { useState, useEffect } from "react";
import { Avatar } from "antd";
import { CameraOutlined } from "@ant-design/icons";

const SurveyAvatar = ({
  src,
  className = "",
  size = 80,
  shape = "square",
  onClick,
}) => {
  const [error, setError] = useState(false);
  const [url, setUrl] = useState("images/choice/");

  useEffect(() => {
    setError(false);
  }, [src]);

  const onError = () => {
    if (url === "images/choice/") {
      setUrl("images/survey_approval/");
    } else {
      setError(true);
    }
  };

  const renderSrc =
    !error && src ? `https://server.optimalrating.com/cdn/${url}/${src}` : null;
  const renderIcon = error || !src ? <CameraOutlined /> : null;

  return (
    <span onClick={onClick}>
      <Avatar
        shape={shape}
        size={size}
        className={`SurveyAvatar ${className}`}
        style={{ cursor: "pointer", borderRadius: "0" }}
        onError={onError}
        src={renderSrc}
        icon={renderIcon}
      />
    </span>
  );
};
export default SurveyAvatar;
