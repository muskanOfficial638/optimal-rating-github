import React, { useEffect, useState } from "react";
import { getData } from "../store/requests/global";
import { notification, Spin } from "antd";
import { logout } from "../store/requests/auth";
import { useTranslation } from "react-i18next";
import {ApiUrl} from '../config';

const DeleteProfile = ({ match, history }) => {
  console.log("HELLO, I am delete profile page!!")
  const { t } = useTranslation();
  const { id } = match.params;
  console.log("ID",id)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData({
      url: `${ApiUrl}approve-delete-profile/${id}`,
    })
      .then(() => {
        notification.success({ message: t("msg.success_profile_delete") });
        logout();
        history.push("/");
      })
      .catch(() => {
        notification.error({ message: t("msg.error_profile_delete") });
        setLoading(false);
      });
  }, [id, t, history]);

  return (
    <div className="text-center pt-50">
      <Spin spinning={loading} />
      HELLO, I am delete profile page!!
    </div>
  );
};
export const getServerSideProps = async () => {
  const data = await getData({
    url: `${ApiUrl}approve-delete-profile/${id}`,
  })
    .then(() => {
      notification.success({ message: t("msg.success_profile_delete") });
      logout();
      history.push("/");
    })
    .catch(() => {
      notification.error({ message: t("msg.error_profile_delete") });
      setLoading(false);
    });
  return {
    props: {},
  };
};

export default DeleteProfile;
