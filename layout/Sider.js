import React from "react";
import Link from "next/link";
import { UnorderedListOutlined, RightOutlined } from "@ant-design/icons";
import { ScrollField, Empty } from "../components";
import { useGet } from "../hooks";
import { Menu, Divider, Spin, Button } from "antd";
import { get, countryCode } from "../helpers";
import {ApiUrl} from '../config';
import "../plugins";

const Sider = ({ account, t, isDrawer = false }) => {
  const { data, loading } = useGet({
    url: `${ApiUrl}categories/tree`,
    key: "tree",
    singleLoad: false,
  });
  const Title = ({ text, id }) => (
    <>
      {text}
      <Link href={`/${countryCode()}/category/${id}`}>
        <a><Button size="small" className="text-sm">
          {t("lbl.go")} <RightOutlined className="mr-0 text-xs" />
        </Button></a>
      </Link>
    </>
  );

  return (
    <>
      {!isDrawer && (
        <h3 className="pl-10 pr-10 mt-10">
          <UnorderedListOutlined className="mr-5" />
          {t("lbl.categories")}
        </h3>
      )}
      <ScrollField maxHeight="calc(100% - 120px)">
        <Spin spinning={loading}>
          <Empty
            isEmpty={!get(data, "result.set", []).length > 0}
            className="pt-20"
          >
            <Menu mode="inline" style={{pointerEvents: 'all'}}>
              {get(data, "result.set", [],)
                .sort((a, b) =>
                  parseInt(a.sort_order) > parseInt(b.sort_order)
                    ? 1
                    : parseInt(b.sort_order) > parseInt(a.sort_order)
                    ? -1
                    : 0
                )
                .map((x) => (
                  
                  <Menu.SubMenu
                    key={x.id}
                    title={<Title text={t(x.code)} id={x.slug} />}
                  >
                    {get(x, "children", []).map((y) => (
                      <Menu.SubMenu
                        key={y.id}
                        title={<Title text={y.name} id={y.slug} />}
                      >
                        {get(y, "surveys", []).map((z) =>
                          z.status === "1" ? (
                            <Menu.Item key={z.id}>
                              <Link href={`/${countryCode()}/survey/${z.slug}`}><a>{z.title}</a></Link>
                            </Menu.Item>
                          ) : null
                        )}
                      </Menu.SubMenu>
                    ))}
                  </Menu.SubMenu>
                ))}
            </Menu>
          </Empty>
        </Spin>
      </ScrollField>
      {account && (
        <>
          <Divider />
        </>
      )}
    </>
  );
};
export default Sider;
