import React from "react";
import { useGet } from "../hooks";
import Link from "next/link";
import { Divider, Spin } from "antd";
import { get, countryCode } from "../helpers";
import "../plugins";
import {ApiUrl} from '../config';

const FooterPage = ({ t }) => {
  const { data, loading } = useGet({
    url: `${ApiUrl}pages`,
    key: "pages",
  });

  return (
    <div className="Copyright">
      <Spin spinning={loading}>
        {get(data, "result.set", []).map((x, i) => (
          <span key={x.id}>
            <Link href={`/${countryCode()}/pages/${x.slug}`}>
              <a>{x.translation ? x.translation.title : x.title}</a>
            </Link>
            {i !== data.result.set.length - 1 && <Divider type="vertical" />}
          </span>
        ))}
      </Spin>
    </div>
  );
};
export default FooterPage;
