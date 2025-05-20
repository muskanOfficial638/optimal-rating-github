import React from "react";
import { useTranslation } from "react-i18next";
import { Menu, Dropdown, Button, Spin } from "antd";
import { DownOutlined, GlobalOutlined } from "@ant-design/icons";
import { useGet } from "../../hooks";
import eventBus from "../../plugins/eventBus";
import { get, exists } from "../../helpers";
import Image from 'next/image'
import {ApiUrl, ImageUrl} from '../../config';

const Language = ({ isMenu = false }) => {
  const { i18n, t } = useTranslation();
  const { data, loading } = useGet({
    url: `${ApiUrl}languages`,
    key: "languages",
    // singleLoad: true,
  });
  const code = i18n.language;
  const country =
    typeof window !== "undefined" ? localStorage.getItem("country") : null;
  const selected = get(data, "result.set", []).find((x) => x.code === code);
  // console.log("Selected", selected);

  const onClick = ({ key }) => {
    i18n.changeLanguage(key);
    eventBus.$emit("changeLanguage", key);
  };

  return (
    <Dropdown
      trigger={["click"]}
      disabled={loading}
      overlay={
        <Menu className="LanguageMenu" onClick={onClick} style={{pointerEvents: 'all'}}>
          {get(data, "result.set", [])
            .filter((x) => x.code !== country)
            .map((x) => (
              <Menu.Item key={x.code}>
                {/* <img
                  src={`${process.env.REACT_APP_CDN_URL}images/country/${x.flag}`}
                  alt={x.name}
                /> */}
                <Image
                  src={`${ImageUrl}country/${x.flag}`}
                  alt={x.name}
                  width={17}
                  height={12}
                />
                <label className="counLbl">{x.name}</label>
              </Menu.Item>
            ))}
        </Menu>
      }
    >
      <Button type="link" block={isMenu} className="LanguageButton">
        <Spin spinning={loading}>
          {country === "null" || !selected ? (
            <>
              <GlobalOutlined className="mr-5" />
              {t("lbl.world")}
            </>
          ) : exists(selected, "flag") ? (
            <>
              {/* <img
                src={`${process.env.REACT_APP_CDN_URL}images/country/${get(
                  selected,
                  "flag"
                )}`}
                alt={get(selected, "name")}
              /> */}{" "}
              <Image
                src={`${ImageUrl}country/${get(
                  selected,
                  "flag"
                )}`}
                alt={get(selected, "name")}
                  width={17}
                  height={12}
              />
              <label className="counLbl">{selected.name}</label>
            </>
          ) : (
            <label className="counLbl">{selected.name}</label>
          )}
          <DownOutlined />
        </Spin>
      </Button>
    </Dropdown>
  );
};
export default Language;
