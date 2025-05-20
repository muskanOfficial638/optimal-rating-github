 import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Spin, Divider, Card, Collapse, Button } from "antd";
import { Empty, CategorySurvey, Permission } from "../../../components";
import { get, exists, countryCode } from "../../../helpers";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { DoubleRightOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Layout from "../../../layout";
import "../../../plugins";
import { seti18n, fetchi18n } from "../../../store/requests/global";

const CategorySurveys = ({ match, history, res, session }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data, loading } = useSelector((state) => state.global.tree);
  const { id } = router.query;
  const findItem = () => {
    const list = [];
    get(data, "result.set", []).forEach((x) => {
      list.push(
        { ...x, name: t(x.code) },
        ...x.children.map((y) => ({ ...y, parentName: t(x.code) }))
      );
    });

    return list.find((x) => x.slug === id);
  };

  const item = findItem();

  useEffect(() => {
    seti18n(res);
  }, [res]);

  return (
    <div className="Category">
      <Layout>
        <Spin spinning={loading}>
          <Empty isEmpty={!item}>
            <h1 className="text-bold text-xxl">
              {exists(item, "parentName") && (
                <>
                  <Link
                    href={`/${countryCode()}/category/${get(item, "parent")}`}
                  >
                    <a>{get(item, "parentName")}</a>
                  </Link>
                  <DoubleRightOutlined className="ml-5 mr-5 text-md" />
                </>
              )}
              {get(item, "name")}
            </h1>
            {exists(item, "surveys") ? (
              <Empty
                isEmpty={get(item, "surveys", []).length === 0}
                description={t("lbl.no_survey")}
                emptyChild={
                  <Permission
                    showChild
                    type="agreement"
                    callback={() =>
                      router.push(`/${countryCode()}/survey`, undefined, {
                        shallow: true,
                      })
                    }
                    session = {session}
                  >
                    <Button type="primary" icon={<PlusOutlined />}>
                      {t("lbl.add_new_survey")}
                    </Button>
                  </Permission>
                }
              >
                {get(item, "surveys", []).map((x) =>
                  x.status === "1" ? (
                    <div key={x.id}>
                      <CategorySurvey
                        // url={`/${countryCode()}/survey/${x.slug}`}
                        url={`/surveys/detail/${x.slug}`} //edited by Muskan
                        short
                      />
                      <Divider style={{ borderColor: "rgba(0,0,0,0.1)" }} />
                    </div>
                  ) : null
                )}
              </Empty>
            ) : (
              <Empty isEmpty={get(item, "children", []).length === 0}>
                <Card>
                  <Collapse>
                    {get(item, "children", []).map((x) => (
                      <Collapse.Panel
                        key={x.id}
                        header={
                          /*<Link href={`/${countryCode()}/category/${x.slug}`}>
                            <a>{x.name}{x.slug}</a>
                          </Link>*/
                          <div key={x.id}>{x.name}</div>
                        }
                      >
                        <Empty
                          isEmpty={!x.surveys || x.surveys.length === 0}
                          description={t("lbl.no_survey")}
                        >
                          {x.surveys &&
                            x.surveys.length > 0 &&
                            x.surveys
                              .filter((y) => y.status === "1") //edited by Muskan
                              //  .slice(0, 2)
                              .map((y) => (
                                <div key={y.id}>
                                  <Link
                                    href={`/${countryCode()}/survey/${y.slug}`}
                                  >
                                    <a>{y.title}</a>
                                  </Link>
                                </div>
                              ))}
                        </Empty>
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                </Card>
              </Empty>
            )}
          </Empty>
        </Spin>
      </Layout>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const res = await fetchi18n();
  return {
    props: { query, res },
  };
};
export default CategorySurveys;
