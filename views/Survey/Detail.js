import React from "react";
import { SurveyDetail } from "../../components";
import { get } from "../../helpers";

const Detail = ({ data, setUrl, url }) => {
  return (
    <div className="Survey">
      <SurveyDetail
        data={get(data, "result.set")}
        pagination={get(data, "result.pagination")}
        setUrl={setUrl}
        url={url}
      />
    </div>
  );
};
export default Detail;
