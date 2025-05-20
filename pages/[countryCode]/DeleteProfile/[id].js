import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getData } from "../../../store/requests/global";
import { notification, Spin } from "antd";
// import { logout } from "../../../store/requests/auth";
import { useTranslation } from "next-i18next";
import { ApiUrl } from "../../../config";
// import Layout from "../../../layout";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { signOut } from "next-auth/react";

const DeleteProfile = ({ history }) => {
  const router = useRouter();
  const { countryCode, id } = router.query;
  const { t } = useTranslation("msg"); // Ensure this matches your namespace

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    const authToken = localStorage.getItem("token");
    axios
      .get(`${ApiUrl}approve-delete-profile/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const token = localStorage.getItem("token");
          const session = localStorage.getItem("session");
          if (token && session) {
            signOut({callbackUrl: '/'});
            localStorage.removeItem("session");
            localStorage.removeItem("account");
            localStorage.removeItem("token");
            localStorage.removeItem("registered");
            // localStorage.clear();
          }
          notification.success({ message: "Profile has been deleted." });
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else if (response.status === 400) {
          notification.error({ message: "Token not found." });
        } else {
          notification.error({ message: t("msg.error_profile_delete") });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Catch ERR=> ", err);
        notification.error({ message: "Profile could not be deleted." });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, t, router, history]);

  if (loading) {
    return <p>Loading...</p>; // Show loading state while waiting for API call
  }

  return (
    <Spin spinning={loading} style={{ height: "100%" }}>
      {/* <Layout> */}
      <div className="text-center pt-50">
        Hello! You are viewing the delete profile page with country code -{" "}
        {countryCode} .
      </div>
      {/* </Layout> */}
    </Spin>
  );
};

export const getServerSideProps = async ({ locale, query }) => {
  try {
    const res = await fetchi18n();
    const data = await getData({
      url: `${ApiUrl}approve-delete-profile/${query.id}`,
    });

    return {
      props: {
        ...(await serverSideTranslations(locale, ["msg"])), // Ensure your translation namespace is included here
        query,
        res,
        data,
      },
    };
  } catch (error) {
    console.error("Server Error: ", error);

    return {
      props: {
        error: "Failed to fetch data",
      },
    };
  }
};

export default DeleteProfile;
