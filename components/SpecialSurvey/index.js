import React, { useEffect, useState, createRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import {
  Card,
  Button,
  Divider,
  Spin,
  Modal,
  notification,
  // Pagination,
} from "antd";
import {
  LineChart,
  Comments,
  Empty,
  Permission,
  Share,
} from "../../components";
import { calculateSurvey, get, countryCode } from "../../helpers";
import { useGet } from "../../hooks";
import { getData, postData } from "../../store/requests/global";
import { DashboardProxy } from "../../proxies";
import { ApiUrl, ImageStorage } from "../../config";
import Link from "next/link";
import pica from "pica";
import { PieChart, Pie, Cell } from "recharts";
import SurveyPieChart from "./SurveyPieChart";
import { useSelector } from "react-redux";

const SpecialSurvey = (props) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.account);
  // const router = useRouter();
  const [voting, setVoting] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // if (props.match?.params?.id) {
    //   setid(props.match.params.id);
    // }
    // return () => {
    //   setid(null);
    // };
    DashboardProxy.setHeader("country", countryCode());
  });

  const { data, loading, refresh } = useGet({
    url: `${ApiUrl}home-current-special-survey`,
    key: "specialSurvey",
  });
  const choices = calculateSurvey(get(data, "result.set.choices", []), true);
  // const surveys = get(data, "result.set", []);

  // const [currentPage, setCurrentPage] = useState(1);
  // const surveysPerPage = 5;

  // Pagination logic
  // const startIndex = (currentPage - 1) * surveysPerPage;
  // const currentSurveys = surveys && surveys.slice(
  //   startIndex,
  //   startIndex + surveysPerPage
  // );

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const history = useRouter();
  const details = get(data, "result.set");
  const chartImageName = `${countryCode()}-${details && details.id}.png`;

  const [resizedImageUrl, setResizedImageUrl] = useState("");

  useEffect(() => {
    const resizeImage = async () => {
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
            setResizedImageUrl(url);
          }, "image/jpeg");
        } catch (error) {
          console.error("Image resizing error:", error);
        }
      };
    };

    resizeImage();
  }, [chartImageName]);

  // useEffect(() => {
  //   const resizeImage = async (chartImageName, surveyId) => {
  //     const image = new Image();
  //     image.src = `${ImageStorage}survey/${chartImageName}`;
  //     image.crossOrigin = "Anonymous";

  //     image.onload = async () => {
  //       const canvas = document.createElement("canvas");
  //       const targetCanvas = document.createElement("canvas");

  //       canvas.width = image.width;
  //       canvas.height = image.height;
  //       targetCanvas.width = 200; // Desired width
  //       targetCanvas.height = 200; // Desired height

  //       const ctx = canvas.getContext("2d");
  //       ctx.drawImage(image, 0, 0);

  //       try {
  //         const picaInstance = pica();
  //         await picaInstance.resize(canvas, targetCanvas);

  //         targetCanvas.toBlob((blob) => {
  //           const url = URL.createObjectURL(blob);
  //           setResizedImageUrl((prevUrls) => ({
  //             ...prevUrls,
  //             [surveyId]: url, // Store the resized image URL for the specific survey
  //           }));
  //         }, "image/jpeg");
  //       } catch (error) {
  //         console.error("Image resizing error:", error);
  //       }
  //     };
  //   };

  // Trigger the image resize for each survey when `data` changes
  //   get(data, "result.set", []).forEach((survey) => {
  //     const chartImageName = `${countryCode()}-${survey.id}.png`; // Dynamic chart image name
  //     if (!resizedImageUrl[survey.id]) {
  //       resizeImage(chartImageName, survey.id); // Resize only if not already resized
  //     }
  //   });
  // }, [data, resizedImageUrl]);

  const onClick = (item) => {
    setSelected(item);
  };

  const submitVote = () => {
    postData({
      url: `${ApiUrl}submitVote/${get(data, "result.set.id")}`,
      data: { choice_id: selected.id },
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

  const cancelVote = (idList) => {
    setVoting(true);
    Promise.all(
      idList.map((x) =>
        getData({
          url: `${ApiUrl}cancelVote/${get(data, "result.set.id")}/${x}`,
        })
      )
    )
      .then(() => {
        submitVote();
      })
      .catch(() => {
        setVoting(false);
      });
  };

  const onProfile = () => {
    Modal.confirm({
      title: t("lbl.verify_profile"),
      content: t("lbl.complete_profile"),
      onOk: () => {
        history.push(`/${countryCode()}/profile`);
      },
    });
  };

  const onVote = () => {
    if (
      !user.user_details?.gender ||
      !user.user_details?.education ||
      !user.user_details?.birthdate ||
      !user?.city
    ) {
      onProfile();
      return;
    } else {
      setVoting(true);
      const promises = choices.map((x) =>
        getData({
          url: `${ApiUrl}checkVote/${get(data, "result.set.id")}/${x.id}`,
        })
          .then((response) => {
            return response;
          })
          .catch(() => {
            return null;
          })
      );
      Promise.all(promises).then((responses) => {
        const response = responses.filter((x) => x);
        if (response.length > 0) {
          setVoting(false);
          Modal.confirm({
            title: t("lbl.cancel_vote"),
            content: t("lbl.survey_already_voted"),
            onOk: () => cancelVote(response.map((x) => x.result.set.choice_id)),
          });
        } else {
          submitVote();
        }
      });
    }
  };

  // const submitVote = (surveyId) => {
  //   postData({
  //     url: `${ApiUrl}submitVote/${surveyId}`,
  //     data: { choice_id: selected?.id },
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
  //           message: t("msg.error_country_vote_notallowed"),
  //         });
  //       } else notification.error({ message: t("msg.error_mark") });
  //       setVoting(false);
  //     });
  // };

  // const cancelVote = (surveyId, idList) => {
  //   setVoting(true);
  //   Promise.all(
  //     idList.map((x) =>
  //       getData({
  //         url: `${ApiUrl}cancelVote/${surveyId}/${x}`,
  //       })
  //     )
  //   )
  //     .then(() => {
  //       submitVote(surveyId);
  //     })
  //     .catch(() => {
  //       setVoting(false);
  //     });
  // };

  // const onVote = (survey) => {
  //   setVoting(true);

  //   // Only work with the specific survey passed as an argument
  //   const surveyId = survey?.id;

  //   // Check if the user has already voted for this specific survey
  //   const promises = survey?.choices.map((x) =>
  //     getData({
  //       url: `${ApiUrl}checkVote/${surveyId}/${x.id}`,
  //     })
  //       .then((response) => {
  //         return { surveyId: survey?.id, response };
  //       })
  //       .catch(() => {
  //         return { surveyId: survey?.id, response: null };
  //       })
  //   );

  //   Promise.all(promises).then((responses) => {
  //     // Filter out null responses to identify if the user has already voted
  //     const alreadyVotedResponses = responses.filter((x) => x.response);

  //     if (alreadyVotedResponses.length > 0) {
  //       setVoting(false);
  //       const surveyId = alreadyVotedResponses[0].surveyId;
  //       Modal.confirm({
  //         title: t("lbl.cancel_vote"),
  //         content: t("lbl.survey_already_voted"),
  //         onOk: () =>
  //           cancelVote(
  //             surveyId,
  //             alreadyVotedResponses.map((x) => x.response.result.set.choice_id)
  //           ),
  //       });
  //     } else {
  //       // If no previous votes found for this survey, proceed to submit the vote
  //       submitVote(surveyId);
  //     }
  //   });
  // };

  // const Title = ({ survey }) => (
  //   <Link href={`/${countryCode()}/special/${survey && survey.slug}`}>
  //     <a>{survey && survey.title}</a>
  //   </Link>
  // );

  const Title = () => (
    <Link href={`/${countryCode()}/special/${get(data, "result.set.slug")}`}>
      <a>{get(data, "result.set.title")}</a>
    </Link>
  );

  const chartRef = createRef();

  const pieData = [
    { name: "A", value: 400 },
    { name: "B", value: 300 },
    { name: "C", value: 300 },
    { name: "D", value: 200 },
  ];

  // const [activeSurveyIndex, setActiveSurveyIndex] = useState(null);

  // const handleOpenSurveyModal = (index) => {
  //   setActiveSurveyIndex(index);
  // };

  // const handleOk = () => {
  //   setActiveSurveyIndex(null);
  // };

  // const handleCancel = () => {
  //   setActiveSurveyIndex(null);
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenSurveyModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    // <Spin spinning={loading}>
    //   {surveys &&
    //     surveys.map((survey, index) => (
    //       <Card
    //         key={survey && survey.id}
    //         title={<Title survey={survey} />}
    //         bordered={false}
    //       >
    //         <Empty isEmpty={!survey}>
    //           <div>
    //             <LineChart
    //               data={calculateSurvey(survey && survey.choices, true)}
    //               selected={selected}
    //               onClick={onClick}
    //               isSpecial
    //               chartImageName={`${countryCode()}-${survey && survey.id}.png`}
    //               url={`/${countryCode()}/special/${survey && survey.slug}`}
    //             />
    //             <div className="mt-20 pl-10">
    //               <div className="d-flex">
    //                 <Permission showChild>
    //                   <Button
    //                     type="primary"
    //                     disabled={!selected}
    //                     onClick={() => onVote(survey)}
    //                     loading={voting}
    //                   >
    //                     {t("lbl.vote")}
    //                   </Button>
    //                 </Permission>
    //                 <p
    //                   className="ml-auto"
    //                   style={{
    //                     color: "#3a99ab",
    //                     marginRight: "5px",
    //                     marginTop: "4px",
    //                   }}
    //                 >
    //                   {t("msg.display")}
    //                 </p>
    //                 <PieChart
    //                   style={{ cursor: "pointer", marginRight: "2px" }}
    //                   width={35}
    //                   height={35}
    //                 >
    //                   <Pie
    //                     data={pieData}
    //                     dataKey="value"
    //                     nameKey="name"
    //                     cx="50%"
    //                     cy="50%"
    //                     outerRadius={15}
    //                     fill="#8884d8"
    //                     label
    //                     onClick={() => handleOpenSurveyModal(index)}
    //                   >
    //                     {/* Define custom colors for each slice */}
    //                     {pieData.map((entry, index) => (
    //                       <Cell
    //                         key={`cell-${index}`}
    //                         fill={
    //                           ["#ff7300", "#ffbf00", "#0088fe", "#00c49f"][
    //                             index
    //                           ]
    //                         }
    //                       />
    //                     ))}
    //                   </Pie>
    //                 </PieChart>
    //                 {activeSurveyIndex === index && (
    //                   <Modal
    //                     title={t("msg.modal_title")}
    //                     open={activeSurveyIndex === index}
    //                     onOk={handleOk}
    //                     onCancel={handleCancel}
    //                     width={700}
    //                   >
    //                     <SurveyPieChart
    //                       data={calculateSurvey(survey && survey.choices, true)}
    //                       ref={chartRef}
    //                       chartImageName={`${countryCode() || "default"}-${
    //                         survey && survey.id
    //                       }.png`}
    //                     />
    //                   </Modal>
    //                 )}
    //                 <Share
    //                   title={(survey && survey.title) || ""}
    //                   url={resizedImageUrl}
    //                   pageUrl={`${
    //                     typeof window !== "undefined"
    //                       ? window.location.origin
    //                       : null
    //                   }/${countryCode()}/special/${survey && survey.slug}`}
    //                   chartRef={""}
    //                 />
    //               </div>
    //               <Divider />
    //               <Comments
    //                 data={get(survey, "comments", [])} // Fetch comments from the survey
    //                 surveyId={survey && survey.id} // Use the survey ID for the comments
    //               />
    //             </div>
    //           </div>
    //         </Empty>
    //       </Card>
    //     ))}
    //   {/* <div style={{ textAlign: "center", marginTop: "20px" }}>
    //     <Pagination
    //       current={currentPage}
    //       pageSize={surveysPerPage}
    //       total={surveys.length}
    //       onChange={handlePageChange}
    //     />
    //   </div> */}
    // </Spin>
    <Spin spinning={loading}>
      <Card title={<Title />} bordered={false}>
        <Empty isEmpty={!get(data, "result.set")}>
          <div>
            <LineChart
              data={choices}
              selected={selected}
              onClick={onClick}
              isSpecial
              chartImageName={chartImageName}
              url={`/${countryCode()}/special/${get(data, "result.set.slug")}`}
            />
            <div className="mt-20 pl-10">
              <div className="d-flex">
                <Permission showChild>
                  <Button
                    type="primary"
                    disabled={!selected}
                    onClick={onVote}
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
                    onClick={handleOpenSurveyModal}
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
                    data={choices}
                    ref={chartRef}
                    chartImageName={chartImageName}
                  />
                </Modal>
                <Share
                  // className="ml-auto"
                  title={(details && details.title) || ""}
                  url={resizedImageUrl}
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
                data={get(data, "result.set.comments", [])}
                surveyId={get(data, "result.set.id")}
              />
            </div>
          </div>
        </Empty>
      </Card>
    </Spin>
  );
};
export default SpecialSurvey;
