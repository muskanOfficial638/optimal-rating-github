import React, { useState } from "react";
import { Modal, Button, Rate, notification } from "antd";
import { StarFilled } from "@ant-design/icons";
import { SurveyAvatar } from "../../components";
import { getData, postData } from "../../store/requests/global";
import "../../styles/components/avatar.less";
import { useSelector } from "react-redux";
import eventBus from "../../plugins/eventBus";
import { useRouter } from "next/router";
import { countryCode } from "../../helpers";
import {ApiUrl} from '../../config';

export default function CategoryModal({
  onClick,
  onRefresh,
  surveyId,
  data,
  t,
}) {
  const user = useSelector((state) => state.auth.account);
  const [mark, setMark] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useRouter();

  const onCancel = () => {
    setMark(0);
    onClick();
  };

  const submitVote = () => {
    postData({
      url: `${ApiUrl}submitVote/${surveyId}`,
      data: { choice_id: data.id, mark },
    })
      .then(() => {
        notification.success({ message: t("msg.success_marking") });
        setLoading(false);
        onRefresh();
        onClick();
      })
      .catch((err) => {
        if (err.message === "msg.info.not_approved") {
          // not approved user
          Modal.confirm({
            title: t("lbl.cancel_vote"),
            content: t("msg.must_approved"),
            //onOk: () => history.push(`/${countryCode()}/profile`),
          });
        } else if (err.message === "msg.info.country_vote_notallowed") {
          notification.error({
            message: t("msg.error_unauthorized_country"),
          });
        } else notification.error({ message: t("msg.error_mark") });
        setLoading(false);
      });
  };

  const cancelVote = () => {
    setLoading(true);
    getData({
      url: `${ApiUrl}cancelVote/${surveyId}/${data.id}`,
    })
      .then(() => {
        submitVote();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onMark = () => {
    if (!user) {
      return eventBus.$emit("login");
    }
    setLoading(true);
    getData({
      url: `${ApiUrl}checkVote/${surveyId}/${data.id}`,
    })
      .then(() => {
        setLoading(false);
        Modal.confirm({
          title: t("lbl.cancel_vote"),
          content: t("lbl.choice_already_voted"),
          onOk: cancelVote,
        });
      })
      .catch(() => {
        submitVote();
      });
  };

  const footer = [
    <div key="footer" className="d-flex">
      <Rate
        value={mark}
        onChange={(e) => setMark(e)}
        character={<StarFilled />}
      />
      <div className="ml-auto">
        <Button
          type="primary"
          disabled={!mark}
          loading={loading}
          onClick={onMark}
        >
          {t("lbl.okay")}
        </Button>
      </div>
    </div>,
  ];

  const getDescriptionTest = () => {
    return { __html: data.choice_description };
  };


  console.log("------data------",data.choice_title);
  return (
    <>
      {!!data && (
        <Modal
          width={600}
          visible={!!data}
          title={data.choice_title}
          footer={footer}
          wrapClassName="CategoryModal"
          onCancel={onCancel}
        >
          <div className="d-flex">
            <SurveyAvatar src={data.choice_image} />
            <div
              className="ml-20"
              dangerouslySetInnerHTML={getDescriptionTest()}
              style={{ wordBreak: "break-word" }}
            />
          </div>
        </Modal>
      )}
    </>
  )
}
