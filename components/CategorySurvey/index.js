import React, { useState, createRef } from "react";
import { Card, Divider, Spin, Button, Rate, Row, Col } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import PieChart from "./PieChart";
import CategoryModal from "./CategoryModal";
import {
  calculateSurveyForCategory,
  get,
  exists,
  countryCode,
} from "../../helpers";
import {
  Comments,
  LineChart,
  Permission,
  Empty,
  NewSurveyChoice,
  Share,
} from "../../components";
import { useGet } from "../../hooks";
import { useRouter } from "next/router";
import { ImageStorage } from "../../config";
import Image from "next/image";

const CategorySurvey = ({
  url,
  survey,
  hasData = false,
  onRefresh,
  short = false,
}) => {
  const useData = useGet({ url });
  const { data, loading, refresh } = hasData
    ? { data: survey, loading: false, refresh: onRefresh }
    : useData;
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();
  const history = useRouter();
  const choices = calculateSurveyForCategory(
    get(data, "result.set.choices", []),
    true
  );
  const filteredChoices = choices.filter((choice) => choice.status === "1");
  const chartRef = createRef();
  const chartImageName = `${countryCode()}-${get(data, "result.set.id")}.png`;

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
    <div className="CategorySurvey">
      <Spin spinning={loading || false}>
        <Card title={<Title />} extra={<Extra />} bordered={false}>
          <Empty isEmpty={!exists(data, "result.set")}>
            <div>
              {!short && (
                <>
                  <Row gutter={16} justify="center">
                    {filteredChoices.slice(0, 3).map((choice, index) => (
                      <Col
                        key={index}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={8}
                        xl={8}
                        xxl={8}
                      >
                        <Card
                          style={{ marginBottom: 16 }}
                          cover={
                            <Image
                              src={
                                (choice && choice.isImageUpdated) ||
                                choice.deleted_at
                                  ? `https://server.optimalrating.com/cdn/images/choice/${
                                      choice && choice.choice_image
                                    }`
                                  : `https://server.optimalrating.com/cdn/images/survey_approval/${
                                      choice && choice.choice_image
                                    }`
                              }
                              alt={`Choice ${index + 1}`}
                              layout="responsive"
                              objectFit="cover"
                              height={120}
                              width={100}
                            />
                          }
                        >
                          <Card.Meta
                            title={choice && choice.choice_title}
                            description={
                              <div className="RatingWrapper">
                                <Rate
                                  value={choice?.votes?.at(-1)?.mark || 0}
                                  disabled
                                  style={{ fontSize: 20 }}
                                />
                                <span style={{ marginLeft: 10, fontSize: 18 }}>
                                  {choice && choice.percent}%
                                </span>
                              </div>
                            }
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <PieChart
                    data={filteredChoices.slice(0, 5)}
                    ref={chartRef}
                    chartImageName={chartImageName}
                  />
                  <Divider style={{ marginBottom: 10 }} />
                  <div className="d-flex">
                    <NewSurveyChoice surveyId={get(data, "result.set.id")} />
                    <Share
                      className="ml-auto"
                      title={get(data, "result.set.title")}
                      url={`${ImageStorage}survey/${chartImageName}`}
                      pageUrl={`${
                        typeof window !== "undefined"
                          ? window.location.origin
                          : null
                      }/${countryCode()}/survey/${get(
                        data,
                        "result.set.slug"
                      )}`}
                      chartRef={chartRef}
                    />
                  </div>
                </>
              )}
              <LineChart
                className="mb-20"
                data={filteredChoices}
                surveyId={get(data, "result.set.id")}
                onClick={onClick}
                url={`/${countryCode()}/survey/${get(data, "result.set.slug")}`}
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
  );
};
export default CategorySurvey;
