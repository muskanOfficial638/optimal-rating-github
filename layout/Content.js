import React from "react";
import Link from "next/link";
import Router from 'next/router'
import { Card, Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import routes from "../plugins/routes";
import eventBus from "../plugins/eventBus";
import { TopList } from "../components";
import { useSelector } from "react-redux";
import { countryCode } from "../helpers";

const Content = ({ t, i18n }) => {
  const user = useSelector((state) => state.auth.account)

  const onClick = () => {
    eventBus.$emit("changeLanguage", "null");
  };
  

  return (
    <div className="Content">
      <div className="Container" >
        {/* <div>
          {routes &&
            routes.map((x) => (
              <Router
                exact={x.exact}
                key={x.path}
                path={`${x.path}`}
                render={(props) =>
                  user && user.status === "freeze" && !x.freeze ? (
                    <Link href={`/${countryCode()}/approve`} />
                  ) : user && user.status !== "freeze" && x.freeze ? (
                    <Link href="/" />
                  ) : !x.private || (x.private && user) ? (
                    <x.component {...props} route={x} />
                  ) : (
                    <Link href="/" />
                  )
                }
              />
            ))}
        </div> */}
      </div>
      <div className="Right" >
        <Card bordered={false} >
          <Button type="link" icon={<GlobalOutlined />} onClick={onClick} >
            {t("lbl.world")}
          </Button>
        </Card>
        <Card bordered={false}>
          <TopList />
        </Card>
      </div>
    </div>
  );
};
export default Content;
