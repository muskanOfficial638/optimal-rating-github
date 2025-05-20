import React, { useState, createRef, useEffect } from "react";
import { Card, Divider, Spin, Button } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import PieChart from "../../../../components/CategorySurvey/PieChart";
import CategoryModal from "../../../../components/CategorySurvey/CategoryModal";
import { calculateSurveyForCategory, get, exists, countryCode } from "../../../../helpers";
import Layout from "../../../../layout";
import {
  Comments,
  LineChart,
  Permission,
  Empty,
  NewSurveyChoice,
  Share,
} from "../../../../components";
import { useGet } from "../../../../hooks";
import { useRouter } from "next/router";
import { seti18n, fetchi18n} from "../../../../store/requests/global";

const CategorySurvey = ({
  url,
  survey,
  hasData = false,
  onRefresh,
  short = false,
  res
}) => {
  const useData = useGet({ url });
  const { data, loading, refresh } = hasData ? { data: survey, loading: false, refresh: onRefresh } : useData;


  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();
  const history = useRouter();
  const choices = calculateSurveyForCategory(get(data, "result.set.choices", []), false);
  const chartRef = createRef();
  const chartImageName =`${get(data, "result.set.id")}.png`

   useEffect(()=>{
    seti18n(res);
  },[res])

  const Extra = () => (
    <Permission
      showChild
      type="agreement"
      callback={() => history.push(`/${countryCode()}/survey`)}
    >
      <Button type="link" icon={<PlusOutlined />}>
        {t("lbl.add_new_survey")}
      </Button>
    </Permission>
  );

  const Title = () => (
    <Link href={`/${countryCode()}/survey/${get(data, "result.set.slug")}`}>
      <a>{get(data, "result.set.title")}</a>
    </Link>
  );

  const onClick = (item) => {
    setSelected(item);
  };

  return (
    <Layout>
    <div className="CategorySurvey">
      <Spin spinning={loading || false}>
        <Card title={<Title />} extra={<Extra />} bordered={false}>
         
          <Empty isEmpty={!exists(data, "result.set")}>
            <div>
              {!short && (
                <>
                  <PieChart
                    data={choices.slice(0, 5)}
                    ref={chartRef}
                    chartImageName={chartImageName}
                  />
                  <Divider style={{ marginBottom: 10 }} />
                  <div className="d-flex">
                    <NewSurveyChoice surveyId={get(data, "result.set.id")} />
                    <Share
                      className="ml-auto"
                      title={get(data, "result.set.title")}
                      url={
                        "https://staging.server.optimalrating.com/storage/survey/" +
                        chartImageName
                      }
                      pageUrl={`${
                        typeof window !== "undefined"
                          ? window.location.origin
                          : null
                      }/${countryCode()}/survey/${get(data, "result.set.slug")}`}
                      chartRef={chartRef}
                    />
                  </div>
                  <Divider style={{ marginTop: 10 }} />
                </>
              )}
              <LineChart
                className="mb-20"
                data={choices}
                surveyId={get(data, "result.set.id")}
                onClick={onClick}
              />
              {!short && (
                <Comments
                  data={get(data, "result.set.comments", [])}
                  surveyId={get(data, "result.set.id")}
                />
              )}
              {selected && !short && (
                <CategoryModal
                  t={t}
                  data={selected}
                  surveyId={get(data, "result.set.id")}
                  onClick={onClick}
                  onRefresh={refresh}
                />
              )}
            </div>
          </Empty>
        </Card>
      </Spin>
    </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query, }) => {
  const res = await fetchi18n()
  return {
    props: { query, res},
  };
};

export default CategorySurvey;
