// pages/[countryCode]/survey/[id].js
import React, { useState, useEffect, useCallback } from "react";
import { CategorySurvey } from "../../../components";
import { useGet } from "../../../hooks";
import Layout from "../../../layout";
import { Spin } from "antd";
import { get, countryCode } from "../../../helpers";
import { getData } from "../../../store/requests/global";
import { ApiUrl, ImageStorage } from "../../../config";
import { seti18n, fetchi18n } from "../../../store/requests/global";
import Head from "next/head";
import axios from "axios";

const Summary = ({ query, res, resLan }) => {
  const { id } = query;
  const [url, setUrl] = useState(`?`);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { data, loading, refresh } = useGet({
  //   url: `${ApiUrl}surveys/detail/${id}${url}`
  // });

  // Memoize the fetchSurveyDetail function with useCallback
  const fetchSurveyDetail = useCallback(async () => {
    setLoading(true);
    try {
      // const response = await axios.get(`${ApiUrl}surveys/detail/${id}${url}`);
      const response = await axios.get(
        `${ApiUrl}surveys/detail/${id}${url}&surveyType=normal`
      );
      setData(response.data);
    } catch (err) {
      setError(err);
      console.error("Error fetching survey detail:", err);
    } finally {
      setLoading(false);
    }
  }, [id, url]);

  useEffect(() => {
    fetchSurveyDetail();
  }, [fetchSurveyDetail]);

  const details = get(res, "result.set", {});
  const imgUrl = `${ImageStorage}survey/${query.countryCode}-${details.id}.png`;
  const detailsUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/${query.countryCode}/survey/${details.slug}`;
  const refresh = () => {
    fetchSurveyDetail();
  };

  useEffect(() => {
    seti18n(resLan);
  }, [resLan]);

  return (
    <Spin spinning={loading} style={{ height: "100%" }}>
      <Layout>
        <div className="Survey">
          <Head>
            <title>{details.title}</title>
          </Head>
          {data && <CategorySurvey survey={data} onRefresh={refresh} hasData />}
        </div>
      </Layout>
    </Spin>
  );
};

export const getServerSideProps = async ({ query }) => {
  // const res = await getData({
  //   url: `${ApiUrl}surveys/detail/${query.id}`,
  // });
  const surveyType = query.surveyType || "normal"; // default to 'normal' if not provided

  const res = await getData({
    url: `${ApiUrl}surveys/detail/${query.id}?surveyType=${surveyType}`,
  });
  const resLan = await fetchi18n();

  const details = get(res, "result.set", {});
  const imgUrl = `${ImageStorage}survey/${query.countryCode}-${details.id}.png`;
  const detailsUrl = `${query.countryCode}/survey/${details.slug}`;

  const metaTags = {
    "og:title": details.title || "Survey",
    "og:description": details.description || "Overview of above survey",
    "og:image": imgUrl,
    "og:url": detailsUrl,
  };

  return {
    props: {
      query,
      res,
      resLan,
      metaTags,
    },
  };
};

export default Summary;
