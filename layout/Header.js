import React, { useState } from "react";
import Link from "next/link";
import {
  Language,
  Login,
  Register,
  Account,
  ForgotPassword,
  Notifications,
} from "../components";
import { Divider, Button } from "antd";
import MobileMenu from "./MobileMenu";
import MobileSider from "./MobileSider";
import "../plugins";
import Image from "next/image";
// import { signOut } from "next-auth/react";

const Header = ({ account }) => {
  return (
    <div className="full-height d-flex a-center">
      <MobileSider />
      <Link href="/">
        <a style={{ display: "flex" }}>
          <Image
            className="Logo"
            src="/static/img/logo.svg"
            alt="Optimal Rating"
            width={139.2}
            height={40}
          />
        </a>
      </Link>
      <MobileMenu account={account} />
      <div className="ml-auto Menu">
        {account? (
          <>
            {account && <Notifications />} 
            <Account account = {account} />
          </>
        ) : (
          <>
          {/* <Button
              block
              size="large"
              onClick={() => {signOut(), localStorage.removeItem("session"), localStorage.removeItem("account")}}
            >
              Logout
            </Button> */}
            <Login />
            <Divider type="vertical" />
            <Register/>
            <ForgotPassword />
          </>
        )}
        <Language />
      </div>
    </div>
  );
};
export default Header;
