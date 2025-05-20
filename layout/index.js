import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Card, Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import Header from "./Header";
import Sider from "./Sider";
import Footer from "./Footer";
import { TopList } from "../components";
import eventBus from "../plugins/eventBus";
import "../plugins";
import ApproveProfile from "../views/Approve";

const HomeOne = ({ children }) => {
  const account = useSelector((state) => state.auth.account);
  // console.log("Account", account);
  const { t } = useTranslation();
  const [world, setWorld] = useState("");
  const [width, setWidth] = useState();

  const onClick = () => {
    eventBus.$emit("changeLanguage", null);
  };
  useEffect(() => {
    setTimeout(() => setWorld(t("lbl.world")), 0);
    const resizeListener = () => setWidth(window.innerWidth);
    // set resize listener
    if (typeof o !== "undefined") {
      window.addEventListener("resize", resizeListener);
      setWidth(window.innerWidth);
    }
  }, []);
   return (
    <Layout
      className="MainLayout"
      lang={
        typeof window !== "undefined" ? localStorage.getItem("country") : ""
      }
    >
      <Layout.Header style={{ position: "sticky", top: "0", zIndex: 4 }}>
        <Header account={account} t={t}/>
      </Layout.Header>
      <Layout>
        <Layout.Sider>
          <Sider account={account} t={t} />
        </Layout.Sider>
        <Layout className="ContentLayout">
          <Layout.Content>
          {account && account.status === "freeze" ? (
              <div className="Content">
                <div className="Container">
                  <ApproveProfile />
                </div>
                <div className="Right">
                  <Card bordered={false}>
                    <Button
                      type="link"
                      icon={<GlobalOutlined />}
                      onClick={onClick}
                    >
                      {world}
                    </Button>
                  </Card>
                  <Card bordered={false}>
                    <TopList />
                  </Card>
                </div>
              </div>
            ) : (
              <div className="Content">
                <div className="Container">{children}</div>
                <div className="Right">
                  <Card bordered={false}>
                    <Button
                      type="link"
                      icon={<GlobalOutlined />}
                      onClick={onClick}
                    >
                      {world}
                    </Button>
                  </Card>
                  <Card bordered={false}>
                    <TopList />
                  </Card>
                </div>
              </div>
            )}
          </Layout.Content>
          <Layout.Footer>
            <Footer t={t} />
          </Layout.Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomeOne;
