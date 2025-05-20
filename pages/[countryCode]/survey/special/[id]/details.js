import React, { useState, useEffect, createRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { Card, Button, Divider, Spin, Modal, notification } from "antd";
import {
  LineChart,
  Comments,
  Empty,
  Permission,
  Share,
} from "../../../../../components";
import { calculateSurvey, get, countryCode } from "../../../../../helpers";
import { useGet } from "../../../../../hooks";
import { getData, postData } from "../../../../../store/requests/global";
import Layout from "../../../../../layout";
import { ApiUrl, ImageStorage } from "../../../../../config";
import { seti18n, fetchi18n } from "../../../../../store/requests/global";
import { PieChart, Pie, Cell } from "recharts";
import pica from "pica";
import SurveyPieChart from "../../../../../components/SpecialSurvey/SurveyPieChart";

const SpecialSurveyDetails = (props) => {
  const [voting, setVoting] = useState(false);
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, refresh } = useGet({
    url: `${ApiUrl}home-special-survey/${id}`,
    key: "specialSurvey",
  });
  useEffect(() => {
    seti18n(props.res);
    // if (id) {
    //   setid(id);
    // }
    // return () => {
    //   setid(null);
    // };
  }, [props.match, props.res]);

  const { t } = useTranslation();
  const chartRef = createRef();
  const choices = calculateSurvey(get(data, "result.set.choices", []), true);
  const history = useRouter();
  const chartImageName = `${countryCode()}-${get(data, "result.set.id")}.png`;
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const pieData = [
    { name: "A", value: 400 },
    { name: "B", value: 300 },
    { name: "C", value: 300 },
    { name: "D", value: 200 },
  ];

  const handleOpenSurveyModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
            message: t("msg.error_unauthorized_country"),
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

  const onVote = () => {
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
  };

  return (
    <Layout>
      <Spin spinning={loading}>
        <Card title={get(data, "result.set.title")} bordered={false}>
          <Empty isEmpty={!get(data, "result.set")}>
            <div>
              <LineChart
                data={choices}
                selected={selected}
                onClick={onClick}
                isSpecial
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
                    title={get(data, "result.set.title") || ""}
                    url={resizedImageUrl}
                    pageUrl={`${
                      typeof window !== "undefined"
                        ? window.location.origin
                        : null
                    }/${countryCode()}/special/${
                      get(data, "result.set.slug") || ""
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
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const res = await fetchi18n();
  return {
    props: { query, res },
  };
};

export default SpecialSurveyDetails;
