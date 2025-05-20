import React, { useEffect, useState } from "react";
import { Card, Divider, Dropdown, Button, Menu, Pagination } from "antd";
import { SortAscendingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { calculateSurvey, get } from "../../helpers";
import { SurveyAvatar, Comments } from "../../components";
import { orderBy } from "lodash";
import CategoryModal from "../../components/CategorySurvey/CategoryModal";

const Backup = (props) => {
  const { data, setUrl, url, pagination } = props;
  const { t } = useTranslation();
  const choices = calculateSurvey(get(data, "choices", []));
  const [sort, setSort] = useState("percent");
  const [selected, setSelected] = useState(null);
  const [displayId, setId] = useState(null);
  const [isShowMore, setisShowMore] = useState(true);

  useEffect(() => {
    setUrl(`?take=${50}&page=${0}&pagination=true&offset=${0}&limit=${50}`);
    return () => {
      setUrl("?");
    };
  }, [setUrl]);

  const onClick = (item) => {
    setSelected(item);
  };

  const onShowMoreChange = (id) => {
    setId(isShowMore ? id : null);
    setisShowMore(!isShowMore);
  };

  const sorts = {
    percent: "percent",
    choice_title: (x) => x.choice_title.toLowerCase(),
  };

  const Extra = () => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => setSort(key)} style={{pointerEvents: 'all'}}>
          <Menu.Item key="percent">{t("lbl.sort_score")}</Menu.Item>
          <Menu.Item key="choice_title">{t("lbl.sort_alphabetic")}</Menu.Item>
        </Menu>
      }
    >
      <Button type="link" icon={<SortAscendingOutlined />} />
    </Dropdown>
  );

  return (
    <Card
      className="SurveyDetail"
      title={get(data, "title")}
      extra={<Extra />}
      bordered={false}
    >
      {selected && (
        <CategoryModal
          t={t}
          data={selected}
          surveyId={get(data, "id")}
          onClick={onClick}
          onRefresh={() => 1}
        />
      )}
      <div className="SurveyItems">
        {orderBy(choices, sorts[sort], sort === "percent" ? "desc" : "asc").map(
          (x) => (
            <div key={x.id} className="SurveyItem">
              <SurveyAvatar src={x.choice_image} onClick={() => onClick(x)} />
              <div className="SurveyContent">
                <div
                  className="Label"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onClick(x);
                  }}
                >
                  {x.choice_title}
                </div>
                <div className="Bar">
                  <div className="BarBg" style={{ width: `${x.percent}%` }} />
                  <span>{x.percent}%</span>
                </div>
                <div className="Description">
                  {x.choice_description.length > 120 ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "column",
                        }}
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              displayId === x.id
                                ? x.choice_description
                                : x.choice_description.substring(0, 120),
                          }}
                        ></p>
                        <Button
                          onClick={() => onShowMoreChange(x.id)}
                          type="link"
                          style={{ textAlign: "right" }}
                        >
                          Show {displayId === x.id ? "Less" : "More"}
                        </Button>
                      </div>
                    </>
                  ) : (
                    x.choice_description
                  )}
                </div>
              </div>
            </div>
          )
        )}
        <div>
          <Pagination
            style={{ margin: "28px auto", textAlign: "center" }}
            pageSize={50}
            total={pagination?.recordCount}
            onChange={(page, pageSize) => {
              let offset = (page - 1) * pageSize;
              setUrl(
                `?take=${pageSize}&page=${page}&pagination=true&offset=${offset}&limit=${pageSize}`
              );
            }}
          />
        </div>
      </div>
      <Divider />
      <Comments data={get(data, "comments", [])} />
    </Card>
  );
};
export default Backup;
