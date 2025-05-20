import React from "react";
import { CategorySurvey } from "../../components";

const Summary = ({ data, onRefresh }) => {
  return (
    <div className="Survey">
      <CategorySurvey survey={data} onRefresh={onRefresh} hasData />
    </div>
  );
};
export default Summary;