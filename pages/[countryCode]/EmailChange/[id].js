import React, { useEffect, useState } from "react";
import { getData } from "../../../store/requests/global";
import { notification, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { ApiUrl } from '../../../config';
import { useRouter } from "next/router";

const EmailChange = ({history }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData({
      url: `${ApiUrl}verify-email-change/${id}`,
    })
      .then(() => {
        notification.success({ message: t("msg.success_email_changed") });
        router.push("/");
      })
      .catch(() => {
        notification.error({ message: t("msg.error_email_changed") });
        setLoading(false);
        router.push("/");
      });
  }, [id, t, history,router]);

  return (
    <div className="text-center pt-50">
      <Spin spinning={loading} />
      Email Changed!
    </div>
  );
};

// export const getServerSideProps = async () => {
//   getData({
//     url: `${ApiUrl}verify-email-change/${id}`,
//   })
//     .then(() => {
//       notification.success({ message: t("msg.success_email_changed") });
//       history.push("/");
//     })
//     .catch(() => {
//       notification.error({ message: t("msg.error_email_changed") });
//       setLoading(false);
//     });
//   return {
//     props: {},
//   };
// };

export default EmailChange;
