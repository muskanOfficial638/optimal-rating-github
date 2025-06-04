import React, { useEffect, useState, createRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { Card, Button, Divider, Spin, Modal, notification } from "antd";
import {
  LineChart,
  Comments,
  Empty,
  Permission,
  Share,
} from "../../../components";
import { calculateSurvey, get, countryCode } from "../../../helpers";
import { useGet } from "../../../hooks";
import { getData, postData } from "../../../store/requests/global";
import { DashboardProxy } from "../../../proxies";
import Link from "next/link";
import Layout from "../../../layout";
import { ApiUrl, ImageStorage } from "../../../config";
import Head from "next/head";
import { seti18n, fetchi18n } from "../../../store/requests/global";
// import { result } from "lodash";
import { PieChart, Pie, Cell } from "recharts";
import SurveyPieChart from "../../../components/SpecialSurvey/SurveyPieChart";

const SpecialSurveyDetails = ({ query, res, resLan }) => {
  console.log("Is it Speacial survey page")
  // const router = useRouter();
  const [voting, setVoting] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    seti18n(resLan);
    DashboardProxy.setHeader("country", countryCode());
  }, [resLan]);

  const { data, loading, refresh } = useGet({
    url: `${ApiUrl}home-special-survey`,
    key: "specialSurvey",
  });

  const { t } = useTranslation();
  // const choices = calculateSurvey(get(data, "result.set.choices", []), true);
  const history = useRouter();

  // const onClick = (item) => {
  //   setSelected(item);
  // };

  // const submitVote = () => {
  //   postData({
  //     url: `${ApiUrl}submitVote/${get(
  //       data,
  //       "result.set.id"
  //     )}`,
  //     data: { choice_id: selected.id },
  //   })
  //     .then((response) => {
  //       notification.success({ message: t("msg.success_mark") });
  //       setVoting(false);
  //       setSelected(false);
  //       refresh();
  //     })
  //     .catch((err) => {
  //       if (err.message === "msg.info.not_approved") {
  //         // not approved user
  //         Modal.confirm({
  //           title: t("lbl.cancel_vote"),
  //           content: t("msg.must_approved"),
  //           onOk: () => history.push(`/${countryCode()}/profile`),
  //         });
  //       } else if (err.message === "msg.info.country_vote_notallowed") {
  //         notification.error({
  //           message: t("msg.error_unauthorized_country"),
  //         });
  //       } else notification.error({ message: t("msg.error_mark") });
  //       setVoting(false);
  //     });
  // };

  // const cancelVote = (idList) => {
  //   setVoting(true);
  //   Promise.all(
  //     idList.map((x) =>
  //       getData({
  //         url: `${ApiUrl}cancelVote/${get(
  //           data,
  //           "result.set.id"
  //         )}/${x}`,
  //       })
  //     )
  //   )
  //     .then(() => {
  //       submitVote();
  //     })
  //     .catch(() => {
  //       setVoting(false);
  //     });
  // };

  // const onVote = () => {
  //   setVoting(true);
  //   const promises = choices.map((x) =>
  //     getData({
  //       url: `${ApiUrl}checkVote/${get(
  //         data,
  //         "result.set.id"
  //       )}/${x.id}`,
  //     })
  //       .then((response) => {
  //         return response;
  //       })
  //       .catch(() => {
  //         return null;
  //       })
  //   );
  //   Promise.all(promises).then((responses) => {
  //     const response = responses.filter((x) => x);
  //     if (response.length > 0) {
  //       setVoting(false);
  //       Modal.confirm({
  //         title: t("lbl.cancel_vote"),
  //         content: t("lbl.survey_already_voted"),
  //         onOk: () => cancelVote(response.map((x) => x.result.set.choice_id)),
  //       });
  //     } else {
  //       submitVote();
  //     }
  //   });
  // };

  // const Title = () => (
  //   <Link href={`/${countryCode()}/special/${get(data, "result.set.slug")}`}>
  //     <a>{get(data, "result.set.title")}</a>
  //   </Link>
  // );

  const onClick = (item) => {
    setSelected(item);
  };

  const submitVote = (surveyId) => {
      console.log("I am in 5")
    postData({
      url: `${ApiUrl}submitVote/${surveyId}`,
      data: { choice_id: selected?.id },
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
            onOk: () => history.push(`/${countryCode()}/profile`),
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

  const Title = ({ survey }) => (
    <Link href={`/${countryCode()}/special/${survey.slug}`}>
      <a>{survey.title}</a>
    </Link>
  );
  const details = get(res, "result.set");
  const choiceData = calculateSurvey(details.choices, true);
  // const imgUrl = `${ImageStorage}survey/${query.countryCode}-${details.id}.png`;
  // const detailsUrl = `${typeof window !== "undefined"? window.location.origin:''}/${query.countryCode}/special/${details.slug}`;
  // const chartImageName = `${query.countryCode}-${details.id}.png`;

  const chartRef = createRef();

  const pieData = [
    { name: "A", value: 400 },
    { name: "B", value: 300 },
    { name: "C", value: 300 },
    { name: "D", value: 200 },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Spin spinning={loading}>
      <Layout>
        <Head>
          <meta charSet="utf-8" />
          <title>{details.title}</title>
        </Head>
        <Card
          key={details && details.id}
          title={<Title survey={details} />}
          bordered={false}
        >
          <Empty isEmpty={!details}>
            <div>
              <LineChart
                data={choiceData}
                selected={selected}
                onClick={onClick}
                isSpecial
                chartImageName={`${countryCode()}-${details && details.id}.png`}
                url={`/${countryCode()}/special/${details && details.slug}`}
              />
              <div className="mt-20 pl-10">
                <div className="d-flex">
                  <Permission showChild>
                    <Button
                      type="primary"
                      disabled={!selected}
                      onClick={() => onVote(details)}
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
                      onClick={showModal}
                    >
                      {/* Define custom colors for each slice */}
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            ["#ff7300", "#ffbf00", "#0088fe", "#00c49f"][index]
                          }
                        />
                      ))}
                    </Pie>
                  </PieChart>
                  <Modal
                    title={t("msg.modal_title")}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={700}
                  >
                    <SurveyPieChart
                      data={choiceData}
                      ref={chartRef}
                      chartImageName={`${countryCode()}-${
                        details && details.id
                      }.png`}
                    />
                  </Modal>
                  <Share
                    title={(details && details.title) || ""}
                    url={`${ImageStorage}survey/
                        ${`${countryCode()}-${details && details.id}.png`}`}
                    pageUrl={`${
                      typeof window !== "undefined"
                        ? window.location.origin
                        : null
                    }/${countryCode()}/special/${
                      (details && details.slug) || ""
                    }`}
                    chartRef={""}
                  />
                </div>
                <Divider />
                <Comments
                  data={get(details, "comments", [])} // Fetch comments from the survey
                  surveyId={details && details.id} // Use the survey ID for the comments
                />
              </div>
            </div>
          </Empty>
        </Card>
      </Layout>
    </Spin>
    //   <Spin spinning={loading}>
    //   <Layout>
    //    <Head>
    //        <meta charSet="utf-8" />
    //        <title>{details.title}</title>
    //      </Head>
    //    <Card title={<Title/>} bordered={false} > c
    //      <Empty isEmpty={!get(data, "result.set")} >
    //        <div>
    //          <LineChart
    //            data={choices}
    //            selected={selected}
    //            onClick={onClick}
    //            isSpecial
    //            chartImageName={chartImageName}
    //          />
    //          <div className="mt-20 pl-10">
    //            <div className="d-flex">
    //              <Permission showChild>
    //                <Button
    //                  type="primary"
    //                  disabled={!selected}
    //                  onClick={onVote}
    //                  loading={voting}
    //                >
    //                  {t("lbl.vote")}
    //                </Button>
    //              </Permission>
    //              <Share
    //                    className="ml-auto"
    //                    title={details && details.title || ''}
    //                    url={
    //                      `${ImageStorage}survey/
    //                      ${chartImageName}`
    //                    }
    //                    pageUrl={`${
    //                      typeof window !== "undefined"
    //                        ? window.location.origin
    //                        : null
    //                    }/${countryCode()}/special/${details &&  details.slug || ''}`}
    //                    chartRef={''}
    //                  />
    //             </div>
    //            <Divider />
    //            <Comments
    //              data={get(data, "result.set.comments", [])}
    //              surveyId={get(data, "result.set.id")}
    //            />
    //          </div>
    //        </div>
    //      </Empty>
    //    </Card>
    //    </Layout>
    //  </Spin>
  );
};

export const getServerSideProps = async ({ query }) => {
  const res = await getData({
    url: `${ApiUrl}surveys/detail/${query.id}`,
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

export default SpecialSurveyDetails;
