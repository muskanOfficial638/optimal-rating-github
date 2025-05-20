import React, { useState, useEffect, useCallback, createRef } from "react";
import {
  Button,
  Card,
  Divider,
  Dropdown,
  Menu,
  Pagination,
  Spin,
  Modal,
} from "antd";
import { calculateSurvey, get, countryCode } from "../../../helpers";
import Link from "next/link";
import { SortAscendingOutlined } from "@ant-design/icons";
import { orderBy } from "lodash";
import Layout from "../../../layout";
import { useRouter } from "next/router";
import { ApiUrl, ImageStorage } from "../../../config";
import {
  seti18n,
  fetchi18n,
  getData,
  postData,
} from "../../../store/requests/global";
import axios from "axios";
import {
  LineChart,
  Comments,
  Empty,
  Permission,
  Share,
} from "../../../components";
import SurveyPieChart from "../../../components/SpecialSurvey/SurveyPieChart";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell } from "recharts";
import pica from "pica";

const Subjects = ({ match, res }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id: slug } = router.query;
  const [sort, setSort] = useState("vote");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    take: 5,
    page: 0,
    offset: 0,
  });
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [voting, setVoting] = useState(false);
  const [resizedImageUrl, setResizedImageUrl] = useState("");

  // console.log("API Request URL:", `${ApiUrl}subjectHasSurvey/${slug}`);
  // console.log(
  //   "Country Header:",
  //   countryCode() === "null" ? "world" : countryCode()
  // );

  const fetchSurveyData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${ApiUrl}subjectHasSurvey/${slug}?orderBy=${sort}&take=${pagination.take}&page=${pagination.page}&offset=${pagination.offset}`,
        {
          headers: {
            country: countryCode() === "null" ? "world" : countryCode(),
          },
        }
      );
      console.log("Survey Data:", response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching survey data:", error.response?.data);
    }
  }, [slug, sort, pagination]);

  useEffect(() => {
    seti18n(res);
    if (slug) {
      fetchSurveyData();
    }
  }, [res, slug, fetchSurveyData, sort, pagination]);

  const surveys = calculateSurvey(get(data, "result.set.surveys", []), true);

  useEffect(() => {
    const resizeImage = async (chartImageName, surveyId) => {
      const image = new Image();
      image.src = `${ImageStorage}survey/${chartImageName}`;
      image.crossOrigin = "Anonymous";

      image.onload = async () => {
        const canvas = document.createElement("canvas");
        const targetCanvas = document.createElement("canvas");

        canvas.width = image.width;
        canvas.height = image.height;
        targetCanvas.width = 200; // Desired width
        targetCanvas.height = 200; // Desired height

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        try {
          const picaInstance = pica();
          await picaInstance.resize(canvas, targetCanvas);

          targetCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            setResizedImageUrl((prevUrls) => ({
              ...prevUrls,
              [surveyId]: url, // Store the resized image URL for the specific survey
            }));
          }, "image/jpeg");
        } catch (error) {
          console.error("Image resizing error:", error);
        }
      };
    };

    // Trigger the image resize for each survey when `data` changes
    surveys.forEach((survey) => {
      const chartImageName = `${countryCode()}-${survey.id}.png`; // Dynamic chart image name
      if (!resizedImageUrl[survey.id]) {
        resizeImage(chartImageName, survey.id); // Resize only if not already resized
      }
    });
  }, [data, resizedImageUrl, surveys]);

  const Extra = () => (
    <Dropdown
      overlay={
        <Menu
          onClick={({ key }) => setSort(key)}
          style={{ pointerEvents: "all" }}
        >
          <Menu.Item key="date">Latest</Menu.Item>
          <Menu.Item key="vote">Highest Vote</Menu.Item>
        </Menu>
      }
    >
      <Button type="link" icon={<SortAscendingOutlined />} />
    </Dropdown>
  );

  const chartRef = createRef();

  const onClick = (item) => {
    setSelected(item);
  };
  const submitVote = (surveyId) => {
    postData({
      url: `${ApiUrl}submitVote/${surveyId}`,
      data: { choice_id: selected && selected.id },
    })
      .then((response) => {
        notification.success({ message: t("msg.success_mark") });
        setVoting(false);
        setSelected(false);
        refresh();
      })
      .catch((err) => {
        if (err.message === "msg.info.not_approved") {
          // not approved user
          Modal.confirm({
            title: t("lbl.cancel_vote"),
            content: t("msg.must_approved"),
            onOk: () => router.push(`/${countryCode()}/profile`),
          });
        } else if (err.message === "msg.info.country_vote_notallowed") {
          notification.error({
            message: t("msg.error_country_vote_notallowed"),
          });
        } else notification.error({ message: t("msg.error_mark") });
        setVoting(false);
      });
  };

  const cancelVote = (surveyId, idList) => {
    setVoting(true);
    Promise.all(
      idList.map((x) =>
        getData({
          url: `${ApiUrl}cancelVote/${surveyId}/${x}`,
        })
      )
    )
      .then(() => {
        submitVote(surveyId);
      })
      .catch(() => {
        setVoting(false);
      });
  };

  const onVote = (survey) => {
    setVoting(true);

    // Only work with the specific survey passed as an argument
    const surveyId = survey?.id;

    // Check if the user has already voted for this specific survey
    const promises = survey?.choices.map((x) =>
      getData({
        url: `${ApiUrl}checkVote/${surveyId}/${x.id}`,
      })
        .then((response) => {
          return { surveyId: survey?.id, response };
        })
        .catch(() => {
          return { surveyId: survey?.id, response: null };
        })
    );

    Promise.all(promises).then((responses) => {
      // Filter out null responses to identify if the user has already voted
      const alreadyVotedResponses = responses.filter((x) => x.response);

      if (alreadyVotedResponses.length > 0) {
        setVoting(false);
        const surveyId = alreadyVotedResponses[0].surveyId;
        Modal.confirm({
          title: t("lbl.cancel_vote"),
          content: t("lbl.survey_already_voted"),
          onOk: () =>
            cancelVote(
              surveyId,
              alreadyVotedResponses.map((x) => x.response.result.set.choice_id)
            ),
        });
      } else {
        // If no previous votes found for this survey, proceed to submit the vote
        submitVote(surveyId);
      }
    });
  };

  const pieData = [
    { name: "A", value: 400 },
    { name: "B", value: 300 },
    { name: "C", value: 300 },
    { name: "D", value: 200 },
  ];

  const [activeSurveyIndex, setActiveSurveyIndex] = useState(null);

  const handleOpenSurveyModal = (index) => {
    setActiveSurveyIndex(index);
  };

  const handleOk = () => {
    setActiveSurveyIndex(null);
  };

  const handleCancel = () => {
    setActiveSurveyIndex(null);
  };
  return (
    <Layout>
      <Spin spinning={loading}>
        <Empty isEmpty={surveys.length === 0}>
          <Card
            className="SurveyDetail"
            title={
              <h1 style={{ fontSize: "20px", fontWeight: "600" }}>
                {get(data, "result.set.title")}
              </h1>
            }
            extra={<Extra />}
            bordered={false}
          >
            <div className="SurveyItems">
              {orderBy(
                surveys,
                sort === "vote" ? "vote" : (x) => x.created_at,
                sort === "vote" ? "desc" : "asc"
              ).map((survey, index) => (
                <div key={survey.id} className="SurveyItem">
                  <div className="SurveyContent">
                    <div
                      className="Label"
                      style={{
                        cursor: "pointer",
                        fontSize: "16px",
                        marginBottom: "15px"
                      }}
                    >
                      <Link
                        href={`/${countryCode()}/survey/special/${
                          survey.id
                        }/details`}
                      >
                        <a>{survey.title}</a>
                      </Link>
                    </div>
                    <LineChart
                      data={calculateSurvey(survey && survey.choices, true)}
                      selected={selected}
                      onClick={onClick}
                      isSpecial
                      chartImageName={`${countryCode()}-${
                        survey && survey.id
                      }.png`}
                      url={`/${countryCode()}/special/${survey && survey.slug}`}
                    />
                    <div className="mt-20 pl-10">
                      <div className="d-flex">
                        <Permission showChild>
                          <Button
                            type="primary"
                            disabled={!selected}
                            onClick={() => onVote(survey)}
                            loading={voting}
                          >
                            {t("lbl.vote")}
                          </Button>
                        </Permission>
                        <p
                          className="ml-auto"
                          style={{
                            color: "#3a99ab",
                            marginRight: "5px",
                            marginTop: "4px",
                          }}
                        >
                          {t("msg.display")}
                        </p>
                        <PieChart
                          style={{ cursor: "pointer", marginRight: "2px" }}
                          width={35}
                          height={35}
                        >
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={15}
                            fill="#8884d8"
                            label
                            onClick={() => handleOpenSurveyModal(index)}
                          >
                            {/* Define custom colors for each slice */}
                            {pieData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  ["#ff7300", "#ffbf00", "#0088fe", "#00c49f"][
                                    index
                                  ]
                                }
                              />
                            ))}
                          </Pie>
                        </PieChart>
                        {activeSurveyIndex === index && (
                          <Modal
                            title={t("msg.modal_title")}
                            open={activeSurveyIndex === index}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={700}
                          >
                            <SurveyPieChart
                              data={calculateSurvey(
                                survey && survey.choices,
                                true
                              )}
                              ref={chartRef}
                              chartImageName={`${countryCode() || "default"}-${
                                survey && survey.id
                              }.png`}
                            />
                          </Modal>
                        )}
                        <Share
                          title={(survey && survey.title) || ""}
                          url={resizedImageUrl}
                          pageUrl={`${
                            typeof window !== "undefined"
                              ? window.location.origin
                              : null
                          }/${countryCode()}/special/${survey && survey.slug}`}
                          chartRef={""}
                        />
                      </div>
                      <Divider />
                      {/* <Comments
                        data={get(survey, "comments", [])} // Fetch comments from the survey
                        surveyId={survey && survey.id} // Use the survey ID for the comments
                      /> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="SurveyItems">
              {orderBy(
                surveys,
                sort === "vote" ? "vote" : (x) => x.created_at,
                sort === "vote" ? "desc" : "asc"
              ).map((x) => (
                <div key={x.id} className="SurveyItem">
                  <div className="SurveyContent">
                    <div
                      className="Label"
                      style={{
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                    >
                      <Link
                        href={`/${countryCode()}/survey/special/${
                          x.id
                        }/details`}
                      >
                        <a>{x.title}</a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            <Divider />
            <Pagination
              style={{ margin: "28px auto", textAlign: "center" }}
              pageSize={pagination.take} // Items per page
              current={pagination.page + 1} // Current page (1-based index)
              total={get(data, "result.pagination.recordCount")} // Total number of items
              onChange={(page, pageSize) => {
                const offset = (page - 1) * pageSize; // Calculate offset
                setPagination({
                  ...pagination,
                  page: page - 1, // 0-based page index for backend
                  offset,
                  take: pageSize, // Items per page
                });
              }}
            />
          </Card>
        </Empty>
      </Spin>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetchi18n();
  return {
    props: { res },
  };
};

export default Subjects;
