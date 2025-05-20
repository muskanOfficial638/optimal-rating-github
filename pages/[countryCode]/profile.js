import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import {
  EyeOutlined,
  UserOutlined,
  KeyOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Info from "../../views/Profile/Info";
import Friends from "../../views/Profile/Friends";
import Privacy from "../../views/Profile/Privacy";
import Password from "../../views/Profile/Password";
import Layout from "../../layout";
import { seti18n, fetchi18n } from "../../store/requests/global";

const ProfileIndex = ({ res }) => {
  const { t } = useTranslation();
  const [active, setActive] = useState("my_profile");

  useEffect(() => {
    seti18n(res);
  }, [res]);

  const components = {
    my_profile: <Info t={t} />,
    friends: <Friends t={t} />,
    privacy: <Privacy t={t} />,
    password: <Password t={t} />,
  };

  const getType = (type) => {
    return active === type ? "primary" : "link";
  };

  const handleSetActive = (key) => {
    setActive(key);
  };

  return (
    <Layout>
      <div className="User Profile">
        <div className="UserCard">
          <Card bordered={false}>
            <Button
              block
              type={getType("my_profile")}
              onClick={() => handleSetActive("my_profile")}
              icon={<FormOutlined />}
            >
              {t('my_profile')}
            </Button>
            <Button
              block
              type={getType("friends")}
              onClick={() => handleSetActive("friends")}
              icon={<UserOutlined />}
            >
              {t('friends')}
            </Button>
            <Button
              block
              type={getType("privacy")}
              onClick={() => handleSetActive("privacy")}
              icon={<EyeOutlined />}
            >
              {t('privacy')}
            </Button>
            <Button
              block
              type={getType("password")}
              onClick={() => handleSetActive("password")}
              icon={<KeyOutlined />}
            >
              {t('password')}
            </Button>
          </Card>
        </div>
        <div className="UserDetails">
          <Card title={t(active)} bordered={false}>
            {active && components[active]}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const res = await fetchi18n();
  return {
    props: { query, res },
  };
};

export default ProfileIndex;
