//updated by MUSKAN
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { Button, Modal, Input, notification } from "antd";
import {
  UndoOutlined,
  CheckCircleFilled,
  SendOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../auth/firebase";
import { ApiUrl } from "../../config";

const PhoneInputs = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.value);
  const [valid, setValid] = useState(props.valid || false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const isDisabled = valid || !value || value === props.value;
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    // Ensure recaptchaVerifier is initialized only once
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("recaptcha resolved..");
          },

          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            notification.error({ message: t("msg.error_verify_sms") });
            setLoading(false);
            console.log("EXPIRED");
          },
        }
      );

      // For testing purposes, disable app verification
      auth.settings.appVerificationDisabledForTesting = true; // Set to true for testing only, remove this line in production
    }
  }, [t]);

  const onChange = (val) => {
    setValue(val);
    valid && setValid(false);
  };

  const onClick = async () => {
    try {
      // console.log("HI TRY",value)
      setLoading(true);
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+${value}`,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setVisible(true);
      notification.success({ message: t("msg.success_verify_sms") });
      setLoading(false);
    } catch (error) {
      // console.log("hello catch")
      console.error("Error sending OTP:", error);
      notification.error({ message: t("msg.error_verify_sms") });
      setLoading(false);
    }
  };

  const onOk = async () => {
    try {
      setLoading(true);
      const credential = PhoneAuthProvider.credential(verificationId, code);
      const result = await signInWithCredential(auth, credential);
      const idToken = await result.user.getIdToken();
      // Send the ID token to your backend for verification
      const response = await fetch(`${ApiUrl}verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });
      const data = await response.json();
      setToken(idToken);
      setUid(data && data.user_uid);
      console.log("data", data);
      console.log("verify otp res", response);
      if (response.ok) {
        console.log("if");
        setValid(true);
        props.onChange && props.onChange(value);
        props.onSms && props.onSms(code);
        // Pass token and uid to parent via callback
        props?.onPhoneInputChange(idToken, data && data.user_uid);
        props.onValid && props.onValid(true);
        setVisible(false);
        setCode("");
        notification.success({ message: t("msg.success_verify_otp") });
      } else {
        console.log("else");
        notification.error({ message: t("msg.error_verify_incorrect") });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      notification.error({ message: t("msg.error_verify_incorrect") });
      setLoading(false);
    }
  };

  const onCancel = () => {
    setValue(props.value);
    setValid(!!props.value);
  };

  return (
    <div className="PhoneNumber">
      <PhoneInput
        country={props.country || "tr"}
        value={value}
        onChange={onChange}
        inputProps={{ id: "phone_number", name: "phone_number" }}
        inputStyle={{ borderColor: !value ? "#ff4d4f" : ""}}
      />
      {valid && props.value ? (
        <CheckCircleFilled className="text-green" />
      ) : (
        <div className="Buttons">
          {value !== props.value && (
            <Button
              className="mr-5"
              icon={<UndoOutlined />}
              size="small"
              type="link"
              onClick={onCancel}
            />
          )}
          <Button
            type="primary"
            size="small"
            onClick={onClick}
            disabled={isDisabled}
            loading={loading}
          >
            {t("lbl.approve")}
          </Button>
        </div>
      )}
      {visible && (
        <Modal
          title={t("lbl.verify_code")}
          visible={visible}
          onOk={onOk}
          onCancel={() => setVisible(false)}
          okButtonProps={{ loading, disabled: !code, className: "verify_ok" }}
        >
          <div className="mb-5">{t("lbl.verify_code_description")}</div>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t("lbl.verify_code")}
            className="pr-0 verifyinput"
          />
          <div className="mt-10">
            <Button
              type="primary"
              icon={<SendOutlined />}
              className="mt-10 btn-blue"
              onClick={onClick}
              loading={loading}
            >
              {t("lbl.resend")}
            </Button>
          </div>
        </Modal>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
});

PhoneInputs.displayName = "PhoneInputs";
export default PhoneInputs;
