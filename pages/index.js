import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../layout";
import { Loading, Error } from "../components/index";
import { getData, seti18n, fetchi18n} from "../store/requests/global";
import { getAccount } from "../store/requests/auth";
import "../plugins";
import HomeOne from '../views/Home';
import {ApiUrl} from '../config';

const Home = ({res}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [lanData, setLanData] = useState();
  
  const onRefresh = () => {
    Promise.all([getAccount()])
      .then((res) => {
        (res && res.length>0)? setLanData(res[0]) : '';
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
        setLoading(String(true));
      })
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    seti18n(res);
    Promise.all([getAccount()])
      .then((res) => {
        (res && res.length>0)? setLanData(res[0]) : '';
        getData({ url: `${ApiUrl}subjects`, key: "subjects" });
        getData({ url: `${ApiUrl}surveys/newest`, key: "newest" });
        getData({ url: `${ApiUrl}surveys/topVoted`, key: "topVoted" });
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [res]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Optimal Rating</title>
        <meta name="description" content="Website Developed by Yaseen" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </Head>
      <div className={styles.App} style={{height:'100%'}}>
        {error ? (
          <Error onClick={onRefresh} />
        ) : loading ? (
          <Loading className="Large" />
        ) : (
           (lanData && lanData.result && lanData.result.set) && 
            <Layout> 
              <HomeOne />
            </Layout>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query, }) => {
  const res = await fetchi18n()
  return {
    props: { query, res},
  };
};

export default Home;