import React, { useEffect } from "react";
import { Divider } from "antd";
import "../plugins";
import { SpecialSurvey, CategorySurvey } from "../components";
import { ApiUrl } from "../config";
import { countryCode } from "../helpers";
const SurveyHome = () => {
  let url = `${ApiUrl}home-survey-approval?country=${countryCode()}`;

  function clearCookies() {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }

  useEffect(() => {
    // Call this function to clear cookies when needed
    clearCookies();
  });

  return (
    <div className="Home">
      <SpecialSurvey />
      <Divider style={{ borderColor: "rgba(0,0,0,0.1)" }} />
      <CategorySurvey url={url} />
    </div>
  );
};
export default SurveyHome;
