import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ConfigProvider } from "antd";
import * as moment from "moment";
import { getData } from "../store/requests/global";
import eventBus from "../plugins/eventBus";
import { DashboardProxy } from "../proxies";
import { Loading } from "../components";
import en from "antd/lib/locale/en_US";
import tr from "antd/lib/locale/tr_TR";
import hi from "antd/lib/locale/hi_IN";
import { ApiUrl } from '../config';

const ConfigProviderWrapper = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { i18n } = useTranslation();
  const locales = { en, tr, hi };

  useEffect(() => {
    const changeLanguage = (lang) => {
      setLoading(true);
      i18n.changeLanguage(lang === "null" ? "en" : lang);
      moment.locale(lang === "null" ? "en" : lang);
      localStorage.setItem("country", lang === "null" ? "en" : lang);
      DashboardProxy.setHeader("country", lang === "null" ? "en" : lang);
      getData({
        url: `${ApiUrl}subjects`,
        key: "subjects",
      });
      getData({
        url: `${ApiUrl}surveys/newest`,
        key: "newest",
      });
      getData({
        url: `${ApiUrl}surveys/topVoted`,
        key: "topVoted",
      });
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location) {
          const splitUrl = window.location.pathname.split('/');
          if (splitUrl && splitUrl.length > 2) {
            // removed two items
            splitUrl.splice(0, 2)
            //location.replace(window.location.origin+'/'+localStorage.getItem("country")+'/'+splitUrl.join('/'));
            location.replace(window.location.origin)
          } else {
            location.replace(window.location.origin)
          }
        }
        setLoading(false);
      }, 1000);
    };

    eventBus.$on("changeLanguage", changeLanguage);
  }, [i18n]);

  return (
    <ConfigProvider locale={locales[i18n.language]}>
      {/* loading ? <Loading className="Large" /> : children */}
      {children}
    </ConfigProvider>
  );
};

export const getServerSideProps = async () => {
  getData({
    url: `${ApiUrl}subjects`,
    key: "subjects",
  });
  getData({
    url: `${ApiUrl}surveys/newest`,
    key: "newest",
  });
  getData({
    url: `${ApiUrl}surveys/topVoted`,
    key: "topVoted",
  });
  return {
    props: {},
  };
};

export default ConfigProviderWrapper;
