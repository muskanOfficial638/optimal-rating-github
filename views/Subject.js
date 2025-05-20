import React, { useState } from "react";
import { Button, Card, Divider, Dropdown, Menu, Pagination, Spin } from "antd";
import { useGet } from "../hooks";
import { Empty } from "../components";
import { calculateSurvey, get, countryCode } from "../helpers";
import Link from "next/link";
import { SortAscendingOutlined } from "@ant-design/icons";
import { orderBy } from "lodash";
import {ApiUrl} from '../config';

const Subjects = ({ match }) => {
  console.log("Subject.js",match)
  const { id } = match.params;
  const [sort, setSort] = useState("vote");
  const [pagination, setPagination] = useState({
    take: 5,
    page: 0,
    offset: 0,
  });
  const { data, loading } = useGet({
    url: `${ApiUrl}subjectHasSurvey/${id}?orderBy=${sort}&take=${pagination.take}&page=${pagination.page}&offset=${pagination.offset}`,
  });
  let surveys = calculateSurvey(get(data, "result.set.surveys", []), true);

  const sorts = {
    percent: "vote",
    created_at: (x) => x.created_at,
  };

  const Extra = () => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => setSort(key)} style={{pointerEvents: 'all'}}>
          <Menu.Item key="date">Latest</Menu.Item>
          <Menu.Item key="vote">Highest Vote</Menu.Item>
        </Menu>
      }
    >
      <Button type="link" icon={<SortAscendingOutlined />} />
    </Dropdown>
  );
  return (
    <Spin spinning={loading}>
      <Empty isEmpty={get(data, "result.set.surveys", []).length === 0}>
        <Card
          className="SurveyDetail"
          title={
            <h1 style={{ fontSize: "20px", fontWeight: "600" }}>
              {get(data, "result.set.title")}
            </h1>
          }
          extra={<Extra />}
          bordered={false}
        >
          <div className="SurveyItems">
            {orderBy(
              surveys,
              sorts[sort],
              sort === "vote" ? "desc" : "asc"
            ).map((x) => (
              <div key={x.id + Math.random()} className="SurveyItem">
                <div className="SurveyContent">
                  <div
                    className="Label"
                    style={{
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    <Link
                      href={`/${countryCode()}/survey/special/${x.id}/details`}
                    >
                      <a>{x.title}</a>
                    </Link>
                  </div>
                  {/* <div className="Bar">
									<div
										className="BarBg"
										style={{ width: `${x.percent}%` }}
									/>
									<span>{x.percent}%</span>
								</div> */}
                </div>
              </div>
            ))}
          </div>
          <Divider />
          <div>
            <Pagination
              style={{ margin: "28px auto", textAlign: "center" }}
              pageSize={pagination.take}
              total={get(data, "result.pagination")?.recordCount}
              onChange={(page, pageSize) => {
                let offset = (page - 1) * pageSize;
                setPagination({
                  ...pagination,
                  page: page - 1,
                  offset,
                });
              }}
            />
          </div>
        </Card>
      </Empty>
    </Spin>
  );
  /* return (
    <Empty isEmpty={get(data, 'result.set.surveys', []).length === 0} text='Subjects'>
      {data.slice(0, length).map(x => (
        <div key={x.id}>
          <Link to={`/${url}/${x[value]}`}>
          <a>  {translate ? t(x.translate_key) : x.title}</a>
          </Link>
        </div>
      ))}
    </Empty>
  ); */
};
export default Subjects;
