import React from "react";
import { Card, Result, Form, Row, Col, notification } from "antd";
import { Upload } from "../components";
import { useTranslation } from "react-i18next";
import { patchData } from "../store/requests/global";
import { useSelector } from "react-redux";
import fileUpload from "../helpers/fileUpload";
import { putData } from "../store/requests/global";
import { ApiUrl } from "../config";

const ApproveProfile = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const user = useSelector((state) => state.auth.account);

  // const onChange = (url, image) => {
  //   console.log("URL,IMAGE",url,image)
  //   patchData({ url, data: { image } })
  //     .then(() => {
  //       notification.success({ message: t("msg.success_profile_update") });
  //     })
  //     .catch(() => {
  //       notification.error({ message: t("msg.error_profile_update") });
  //     });
  // };

  const onChange = async (url, national_image) => {
    // Create FormData to send the file as multipart data
    if (national_image instanceof File) {
      const formData = new FormData();
      formData.append("national_image", national_image);

      user.national_image = await fileUpload(national_image, "us");
      putData({
        url: `${ApiUrl}profile`,
        data: { user: user },
      })
        .then(() => {
          setLoading(false);
          updateState({ key: "account", data: { ...user } });
          notification.success({
            message: t("msg.success_profile_update"),
          });
        })
        .catch(() => {
          setLoading(false);
          notification.error({ message: t("msg.error_profile_update") });
        });
    }
  };

  const onPortraitImageChange = async (url, portrait_image) => {
    // Create FormData to send the file as multipart data
    if (portrait_image instanceof File) {
      const formData = new FormData();
      formData.append('portrait_image', portrait_image); 

      user.portrait_image = await fileUpload(
        portrait_image,
      "us"
    );
    putData({
      url: `${ApiUrl}profile`,
      data: { user: user },
    })
      .then(() => {
        setLoading(false);
        updateState({ key: "account", data: { ...user } });
        notification.success({
          message: t("msg.success_profile_update"),
        });
      })
      .catch(() => {
        setLoading(false);
        notification.error({ message: t("msg.error_profile_update") });
      });
    }
  };

  return (
    <div className="ApproveProfile">
      <Card title={t("lbl.verify_profile")}>
        <Result
          status="warning"
          title={t("lbl.activate_account")}
          extra={
            user && (
              <Form form={form} initialValues={user} layout="vertical">
                <Row>
                  <Col span={24}>
                    <div className="text-bold">{t("lbl.valid_identity")}</div>
                    <Form.Item name="national_image">
                      <Upload
                        type="un"
                        onChange={(e) => onChange("nationalImage", e)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <div className="text-bold">{t("lbl.recent_picture")}</div>
                    <Form.Item name="portrait_image">
                      <Upload
                        type="up"
                        onChange={(e) => onPortraitImageChange("portraitImage", e)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )
          }
        />
      </Card>
    </div>
  );
};
export default ApproveProfile;
