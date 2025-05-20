import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Divider,
  notification,
  Row,
  Col,
} from "antd";
import { login, socialRegister } from "../../store/requests/auth";
import eventBus from "../../plugins/eventBus";
import "../../plugins";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn, useSession } from "next-auth/react";
import { useGet, useGoogleLogin } from "../../hooks";
import { ApiUrl } from "../../config";
import { get } from "../../helpers";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const { loading, error } = useSelector((state) => state.auth.login);
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const { data: session } = useSession();
  const [storedSession, setStoredSession] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [facebookData, setFacebookData] = useState(null);
  // const [countryId, setIsCountryId] = useState(null)
  const countryCode = i18n.language;
  const { data } = useGet({
    url: `${ApiUrl}languages`,
    key: "languages",
  });
  // const { setSession } = useGoogleLogin(socialRegister, t, loading);
  const selectedCountry = get(data, "result.set", []).find(
    (x) => x.code === countryCode
  );
  useEffect(() => {
    eventBus.$on("login", () => setVisible(true));
    return () => {
      eventBus.$off("login", () => setVisible(true));
    };
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("session");
    if (stored) {
      try {
        const parsedSession = JSON.parse(stored);
        setStoredSession(parsedSession);
      } catch (error) {
        console.error("Error parsing session from localStorage:", error);
        localStorage.removeItem("session");
      }
    }
  }, []);

  useEffect(() => {
    console.log("RegisterSocialUser Triggered:", new Date().toISOString());
    console.log("use effect facebookData", facebookData);
    localStorage.setItem("registered", "true");
    if ((session && !isRegistered && !loading) || facebookData) {
      const registerSocialUser = async () => {
        if (!localStorage.getItem("registered") || facebookData) {
          try {
            localStorage.setItem(
              "session",
              JSON.stringify(session ? session : facebookData)
            );
            localStorage.setItem("token", facebookData?.accessToken);
            await socialRegister({
              token: session?.accessToken || facebookData?.accessToken,
              provider: session?.provider || facebookData.provider,
              countryCode: countryCode,
            });
            notification.success({ message: t("msg.success_login") });
            setIsRegistered(true);
            localStorage.setItem("registered", "true");
          } catch (error) {
            localStorage.clear();
            console.error("Error during social login:", error);
          }
        }
      };
      registerSocialUser();
    }
  }, [session, facebookData]);

  // useEffect(() => {
  //   if (session && !isRegistered && !loading) {
  //     try {
  //       localStorage.setItem("session", JSON.stringify(session));
  //     } catch (error) {
  //       console.error("Error saving session to localStorage:", error);
  //     }
  //     const registerSocialUser = async () => {
  //       try {
  //         // const countryId = selectedCountry?.id
  //         // console.log("countryId",countryId);
  //         await socialRegister({
  //           token: session.accessToken,
  //           provider: session.provider,
  //           countryCode: countryCode,
  //         });
  //         notification.success({ message: t("msg.success_login") });
  //         setIsRegistered(true);
  //       } catch (error) {
  //         const sessionData = localStorage.getItem("session");
  //         if (sessionData) {
  //           localStorage.removeItem("session");
  //           localStorage.removeItem("account");
  //           localStorage.removeItem("token");
  //           localStorage.clear();
  //           // signOut();
  //         }
  //         console.error("Error during social login:", error);
  //       }
  //     };
  //     registerSocialUser();
  //   }
  // }, [session, countryCode, isRegistered, loading, t]);

  useEffect(() => {}, [storedSession]);

  const onSubmit = (values) => {
    login(values)
      .then((response) => {
        // console.log("Login response:", response);
        notification.success({ message: t("msg.success_login") });
        if (
          response &&
          response.user &&
          response.user.status !== "approved" &&
          response &&
          response.user &&
          !response.user.city_id
        ) {
          notification.error({ message: t("msg.error.account_not_approved") });
        }
      })
      .catch((error) => {
        console.error("Login error:", error); // Optionally handle and log any error
      });
  };

  const onForgotClick = () => {
    setVisible(false);
    eventBus.$emit("forgotPassword");
  };

  const onRegisterClick = () => {
    setVisible(false);
    eventBus.$emit("register");
  };

  const responseFacebook = async (response) => {
    const { accessToken } = response;
    const image = response?.picture?.data?.url;
    console.log("response", response);
    // Send token to your Laravel backend
    const res = await fetch(
      "https://staging.server.optimalrating.com/api/facbook-login",
      {
        method: "POST",
        body: JSON.stringify({
          access_token: accessToken,
          email: response?.email,
          image: image,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (data?.accessToken) {
      console.log("FBDATA inside if", data);
      setFacebookData(data);
    }
  };

  return (
    <div>
      <Button type="link" onClick={() => setVisible(true)}>
        {t("lbl.login")}
      </Button>
      {visible && (
        <Modal
          zIndex={9999}
          width={340}
          title={t("lbl.login")}
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <Form name="Login" labelAlign="left" form={form} onFinish={onSubmit}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: t("msg.required_email") },
                { type: "email", message: t("msg.required_email") },
              ]}
            >
              <Input placeholder={t("lbl.email")} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: t("msg.required_password") }]}
            >
              <Input.Password placeholder={t("lbl.password")} />
            </Form.Item>
            {error && (
              <div className="text-center text-red">
                {error.message === "msg.error.account_not_approved"
                  ? t("msg.error.account_not_approved")
                  : t("msg.error_login")}
              </div>
            )}
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t("lbl.login")}
            </Button>
            <div className="mt-5 text-center">
              <Button
                type="link"
                className="pl-0 pr-0"
                onClick={onRegisterClick}
              >
                {t("lbl.register")}
              </Button>
            </div>
            <Row align="middle" gutter={16}>
              <Col flex="auto">
                <Divider />
              </Col>
              <Col>Or</Col>
              <Col flex="auto">
                <Divider />
              </Col>
            </Row>
            {/* <Button
              type=""
              block
              loading={loading}
              onClick={() =>
                signIn("google").then((session) => setSession(session))
              }
            >
              Login with Google
              <FontAwesomeIcon icon={faGoogle} style={{ marginLeft: 8 }} />
            </Button> */}
            <Button
              type=""
              block
              loading={loading}
              disabled={loading || isRegistered}
              onClick={() => {
                if (!loading && !isRegistered) {
                  signIn("google");
                }
              }}
            >
              Login with google
              <FontAwesomeIcon icon={faGoogle} style={{ marginLeft: 8 }} />
            </Button>
            {/* <Button
              type=""
              block
              loading={loading}
              disabled={loading || isRegistered}
              style={{ marginTop: 8 }}
              onClick={() => {
                if (!loading && !isRegistered) {
                  signIn("facebook");
                  // signIn("facebook", { callbackUrl: "/" });
                }
              }}
              // onClick={() => signIn("facebook")}
            >
              Login with facebook
              <FontAwesomeIcon icon={faFacebook} style={{ marginLeft: 8 }} />
            </Button> */}
            {/* <FacebookLogin
              appId="2037132963448464"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
            /> */}
            <FacebookLogin
              appId="2037132963448464"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              render={(renderProps) => (
                <button
                  className="fbButton"
                  type="button"
                  onClick={renderProps.onClick}
                  style={{
                    lineHeight: 1.5715,
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    color: "rgba(0, 0, 0, .85)",
                    width: "100%",
                    margin: "10px 0",
                    padding: "4px 15px",
                    fontSize: "14px",
                    fontWeight: "400",
                    cursor: "pointer",
                    borderRadius: "2px",
                    border: "1px solid #d9d9d9",
                  }}
                >
                  Login with Facebook
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ marginLeft: 8 }}
                  />
                </button>
              )}
            />
            <div className="text-center">
              {t("lbl.reset_password_first")}
              <Button
                type="link"
                className="pl-0 ml-5 pr-0"
                onClick={onForgotClick}
              >
                {t("lbl.click_here")}
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};
export default Login;
