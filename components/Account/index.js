import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Dropdown, Menu } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../store/requests/auth";
import { UserAvatar } from "../../components";
import { get, countryCode } from "../../helpers";
import { useTranslation } from "react-i18next";
import { signOut } from "next-auth/react";

const Account = ({ account, isMenu = false }) => {
  const { t } = useTranslation();
  const history = useRouter();

  const onLogout = () => {
    const token = localStorage.getItem("token");
    const session = localStorage.getItem("session");
    if(token && session){
    signOut({callbackUrl: '/'});
    localStorage.removeItem("session"); 
    localStorage.removeItem("account");
    localStorage.removeItem("token");
    localStorage.removeItem("registered");
    // localStorage.clear();
    }
    else{
    logout().then(() => {
      history.push("/");
    });
  }
  };

  const AccountMenu = () => (
    <Menu style={{ pointerEvents: "all" }}>
      <Menu.Item key="settings">
        <Link href={`/${countryCode()}/profile`}>
          <a>
            <SettingOutlined className="mr-10" />
            {t("lbl.settings")}
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={onLogout}>
        <LogoutOutlined className="mr-10" />
        {t("lbl.logout")}
      </Menu.Item>
    </Menu>
  );

  return isMenu ? (
    <AccountMenu />
  ) : (
    <Dropdown overlay={<AccountMenu />}>
      <Button type="link">
        <UserAvatar
          src={account ? get(account, "user_details.profile_image") : ""}
          className="mr-10"
        />
        {account && account.firstname} {account && account.lastname}
      </Button>
    </Dropdown>
  );
};
export default Account;
