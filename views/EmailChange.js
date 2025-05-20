import React, { useEffect, useState } from "react";
import { getData } from "../store/requests/global";
import { notification, Spin } from "antd";
import { useTranslation } from "react-i18next";
import {ApiUrl} from '../config';

const EmailChange = ({ match, history }) => {
  const { t } = useTranslation();
  const { id } = match.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData({
      url: `${ApiUrl}verify-email-change/${id}`,
    })
      .then(() => {
        notification.success({ message: t("msg.success_email_changed") });
        history.push("/");
      })
      .catch(() => {
        notification.error({ message: t("msg.error_email_changed") });
        setLoading(false);
      });
  }, [id, t, history]);

  return (
    <div className="text-center pt-50">
      <Spin spinning={loading} />
    </div>
  );
};
export const getServerSideProps = async () => {
  getData({
    url: `${ApiUrl}verify-email-change/${id}`,
  })
    .then(() => {
      notification.success({ message: t("msg.success_email_changed") });
      history.push("/");
    })
    .catch(() => {
      notification.error({ message: t("msg.error_email_changed") });
      setLoading(false);
    });
  return {
    props: {},
  };
};

export default EmailChange;
