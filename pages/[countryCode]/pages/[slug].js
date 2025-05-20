import React, {useEffect} from "react";
import { Card, Spin } from "antd";
import { Empty } from "../../../components";
import { get } from "../../../helpers";
import { useSelector } from "react-redux";
import Layout from "../../../layout";
import { useRouter } from 'next/router'
import "../../../plugins";
import { seti18n, fetchi18n} from "../../../store/requests/global";

const Pages = ({ match, res }) => {
  const router = useRouter()
  const { data, loading } = useSelector((state) => state.global.pages);
   const page = get(data, "result.set", []).find(
     (x) => x.slug === router.query.slug
   );
    useEffect(()=>{
    seti18n(res);
  },[res,router])

  return (
    <div className="Pages">
      <Layout>
      <Spin spinning={loading}>
        <Card
          title={
            page
              ? page.translation
                ? page.translation.title
                : page.title
              : null
          }
          bordered={false}
        >
          <Empty isEmpty={!page}>
            <div
              dangerouslySetInnerHTML={{
                __html: page
                  ? page.translation
                    ? page.translation.body
                    : page.body
                  : null,
              }}
            />
          </Empty>
        </Card>
      </Spin>
      </Layout>
     
    </div>
  );
};

export const getServerSideProps = async ({ query, }) => {
  const res = await fetchi18n()
  return {
    props: { query, res},
  };
};

export default Pages;
