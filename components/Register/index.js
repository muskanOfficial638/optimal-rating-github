import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  notification,
  Divider,
} from "antd";
import { PhoneInput } from "../../components/formElements";
import { register, socialRegister } from "../../store/requests/auth";
import eventBus from "../../plugins/eventBus";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn, useSession } from "next-auth/react";
import { useGet } from "../../hooks";
import { ApiUrl, frontDomain } from "../../config";
import { get } from "../../helpers";
import { useRouter } from "next/router";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Register = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [storedSession, setStoredSession] = useState(null);
  const [facebookData, setFacebookData] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { loading } = useSelector((state) => state.auth.register);
  const country =
    typeof window !== "undefined" ? localStorage.getItem("country") : null;
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");

  const { i18n } = useTranslation();
  const { data } = useGet({
    url: `${ApiUrl}languages`,
    key: "languages",
  });
  const countryCode = i18n.language;
  const selectedCountry = get(data, "result.set", []).find(
    (x) => x.code === country
  );
  useEffect(() => {
    eventBus.$on("register", () => setVisible(true));
    return () => {
      eventBus.$off("register", () => setVisible(true));
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
    if ((session && !isRegistered && !loading) || facebookData) {
      try {
        localStorage.setItem(
          "session",
          JSON.stringify(session ? session : facebookData)
        );
        localStorage.setItem("token", facebookData?.accessToken);
      } catch (error) {
        console.error("Error saving session to localStorage:", error);
      }
      const registerSocialUser = async () => {
        try {
          // const countryId = selectedCountry?.id
          // console.log("countryId",countryId);
          await socialRegister({
            token: session?.accessToken || facebookData?.accessToken,
            provider: session?.provider || facebookData.provider,
            countryCode: countryCode,
          });
          notification.success({ message: t("msg.success_login") });
          setIsRegistered(true);
          router.push(
            `${frontDomain}${countryCode}/profile`
          );
        } catch (error) {
          const sessionData = localStorage.getItem("session");
          if (sessionData) {
            localStorage.removeItem("session");
            localStorage.removeItem("account");
            localStorage.removeItem("token");
            localStorage.clear();
            // signOut();
          }
          console.error("Error during social login:", error);
        }
      };
      registerSocialUser();
    }
  }, [session, facebookData]);

  useEffect(() => {}, [storedSession]);

  const handlePhoneInputChange = (token, uid) => {
    setToken(token);
    setUid(uid);
  };

  const onSubmit = (values) => {
    register({
      ...values,
      country,
      sms_verify_code: code,
      idToken: token,
      user_uid: uid,
    })
      .then((response) => {
        if (response) {
          const { code, message } = response;
          if (code === 409) {
            notification.error({ message: t(message) });
          } else {
            notification.success({ message: t("msg.success_register") });
            setVisible(false);
            form.resetFields();
            eventBus.$emit("login");
            notification.success({ message: t("msg.login_message") });
          }
        } else {
          notification.success({ message: t("msg.success_register") });
          setVisible(false);
          form.resetFields();
          eventBus.$emit("login");
          notification.success({ message: t("msg.login_message") });
        }
      })
      .catch((err) => {
        if (err.response) {
          const { code, message } = err.response;
          if (code === 409) {
            notification.error({ message: t(message) });
          } else {
            notification.error({ message: t("msg.error_register") });
          }
        } else {
          notification.error({ message: t("msg.error_register") });
        }
      });
  };

  const validatePassword = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(t("msg.error_password_not_match"));
    },
  });

  const onLoginClick = () => {
    setVisible(false);
    eventBus.$emit("login");
  };

  const responseFacebook = async (response) => {
    const { accessToken } = response;
    const image = response?.picture?.data?.url;
    // console.log("response", response);
    // Send token to your Laravel backend
    const res = await fetch(`${ApiUrl}facbook-login`, {
      method: "POST",
      body: JSON.stringify({
        access_token: accessToken,
        email: response?.email,
        image: image,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data?.accessToken) {
      // console.log("FBDATA inside if", data);
      setFacebookData(data);
    }
  };

  return (
    <div>
      <Button type="link" onClick={() => setVisible(true)}>
        {t("lbl.register")}
      </Button>
      {visible && (
        <Modal
          title={t("lbl.register")}
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <Form name="Login" layout="vertical" form={form} onFinish={onSubmit}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  name="phone_number"
                  label={t("lbl.phone_number")}
                  rules={[
                    { required: true, message: t("msg.required_phone_number") },
                  ]}
                  validateTrigger={["onBlur", "onSubmit"]}
                >
                  <PhoneInput
                    country={country}
                    onSms={(e) => setCode(e)}
                    onPhoneInputChange={handlePhoneInputChange}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="firstname"
                  label={t("lbl.firstname")}
                  rules={[
                    { required: true, message: t("msg.required_firstname") },
                  ]}
                  validateTrigger={["onBlur", "onSubmit"]}
                >
                  <Input disabled={!token} placeholder={t("lbl.firstname")} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="middlename"
                  initialValue=""
                  label={t("lbl.middle_name")}
                >
                  <Input disabled={!token} placeholder={t("lbl.middle_name")} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="lastname"
                  label={t("lbl.lastname")}
                  rules={[
                    { required: true, message: t("msg.required_lastname") },
                  ]}
                  validateTrigger={["onBlur", "onSubmit"]}
                >
                  <Input disabled={!token} placeholder={t("lbl.lastname")} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="email"
                  label={t("lbl.email")}
                  rules={[
                    { required: true, message: t("msg.required_email") },
                    { type: "email", message: t("msg.invalid_email") },
                  ]}
                  validateTrigger={["onBlur", "onSubmit"]}
                >
                  <Input disabled={!token} placeholder={t("lbl.email")} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="password"
                  label={t("lbl.password")}
                  rules={[
                    { required: true, message: t("msg.required_password") },
                  ]}
                  validateTrigger={["onBlur", "onSubmit"]}
                >
                  <Input.Password
                    disabled={!token}
                    placeholder={t("lbl.password")}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="confirm"
                  label={t("lbl.confirm_password")}
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: t("msg.required_confirm_password"),
                    },
                    validatePassword,
                  ]}
                  validateTrigger={["onBlur", "onSubmit"]}
                >
                  <Input.Password
                    disabled={!token}
                    placeholder={t("lbl.confirm_password")}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="mt-20"
            >
              {t("lbl.register")}
            </Button>

            <div className="mt-5 text-center">
              <Button type="link" className="pl-0 pr-0" onClick={onLoginClick}>
                {t("lbl.login")}
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

            <Button
              block
              size="large"
              loading={loading}
              onClick={
                () => {
                  if (!loading && !isRegistered) {
                    signIn("google");
                  }
                }
                // () => signIn("google")
              }
            >
              {t("lbl.register_with_google")}
              <FontAwesomeIcon icon={faGoogle} style={{ marginLeft: 8 }} />
            </Button>
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
                  Register with Facebook
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ marginLeft: 8 }}
                  />
                </button>
              )}
            />
            {/* <Button
              block
              size="large"
              loading={loading}
              onClick={ () =>{
                if (!loading && !isRegistered) { 
                  signIn("facebook");
                }
              }
            }
              // onClick={() => signIn("facebook")}
              style={{ marginTop: 8 }}
            >
              {t("lbl.register_with_facebook")}
              <FontAwesomeIcon icon={faFacebook} style={{ marginLeft: 8 }} />
            </Button> */}
          </Form>
        </Modal>
      )}
    </div>
  );
};
export default Register;
