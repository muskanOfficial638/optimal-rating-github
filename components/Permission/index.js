import React, { useEffect, useState } from "react";
import eventBus from "../../plugins/eventBus";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { countryCode } from "../../helpers";
import axios from 'axios';

const Permission = ({ children, showChild, type = "login", callback }) => {
  const [sessionUser, setSessionUser] = useState({});

  useEffect(() => {
    axios.get('https://staging.optimalrating.com/api/auth/session')
    .then(function (response) {
      if(response.status === 200){
      setSessionUser(response?.data.user)
      }
    })
  },[])
 
  const user = useSelector((state) => state.auth.account);
  const { t } = useTranslation();
  const history = useRouter();

  const hasPermission = () => {
    switch (type) {
      case "login":
        return !!user;
      case "profile":
        return user && user.status === "approved";
      case "agreement":
        return false;
      default:
        break;
    }
  };

  const onLogin = () => {
    eventBus.$emit("login");
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

  const onAgreement = () => {
    Modal.confirm({
      title: t("lbl.terms_of_use"),
      content: t("lbl.terms_of_use_text"),
      onOk: () => {
        callback && callback();
      },
    });
  };

  const onClick = () => {
    switch (type) {
      case "login":
        onLogin();
        if(sessionUser || user.user_details?.phone_number || !user.user_details?.gender || !user.user_details?.education || !user.user_details?.birthdate || !user?.city){
          onProfile();
        }
        break;
      case "profile":
        if (user) {
          onProfile();
        } else {
          onLogin();
        }
        break;
      case "agreement":
        if (!user) {
          onLogin();
          if(sessionUser || !user.user_details?.phone_number || !user.user_details?.gender || !user.user_details?.education || !user.user_details?.birthdate || !user?.city){
            onProfile();
          }
        } else if (user && user.status !== "approved" || !user.user_details?.phone_number || !user.user_details?.gender || !user.user_details?.education || !user.user_details?.birthdate || !user?.city) {
          onProfile();
        } else {
          console.log("here aggree")
          onAgreement();
        }
        break;
      default:
        break;
    }
  };

  return user && hasPermission() ? (
    children
  ) : showChild ? (
    <span onClick={onClick} className="Permission">
      {children}
    </span>
  ) : null;
};
export default Permission;
