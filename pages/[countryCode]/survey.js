import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, Form, Input, Button, Divider, notification } from "antd";
import { CategorySelect } from "../../components/formElements";
import { NewCategory } from "../../components";
import Choices from "../../views/Survey/Create/Choices";
import { postData } from "../../store/requests/global";
import fileUpload from "../../helpers/fileUpload";
import Layout from "../../layout";
import { ApiUrl } from "../../config";
import { seti18n, fetchi18n } from "../../store/requests/global";
import { useRouter } from "next/router";
import i18n from "i18next";
import { PlusOutlined } from "@ant-design/icons";

const Choice = (props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState(null);
  const history = useRouter();

  useEffect(() => {
    seti18n(props.res);
    form.setFieldsValue({
      choices: [
        {
          id: null,
          choice_image: "",
          marking: null,
          choice_title: "",
          choice_description: "",
        },
        {
          id: null,
          choice_image: "",
          marking: null,
          choice_title: "",
          choice_description: "",
        },
        {
          id: null,
          choice_image: "",
          marking: null,
          choice_title: "",
          choice_description: "",
        },
      ],
    });
  }, [form, props.res, t]);

  const { asPath } = history;

  // Extract the country code from the URL path (assuming it's always in the second segment)
  const segments = asPath.split("/");
  const countryCode = segments[1]; // "tr" in this case
  // console.log("countryCode",countryCode);
  useEffect(() => {
    if (props.res) {
      // console.log('Setting translation data:', props.res);
      i18n.addResourceBundle(countryCode, "translation", props.res, true, true);
      i18n.changeLanguage(countryCode);
      // console.log('Translated text new:', i18n.t('lbl.add_survey'));
    }
  }, [props.res, countryCode]);

  const onSubmit = async (values) => {
    setLoading(true);
    for (let index = 0; index < values.choices.length; index++) {
      const choice = values.choices[index];

      values.choices[index].choice_image = await fileUpload(
        choice.choice_image,
        "sa"
      );
    }

    var country =
      typeof window !== "undefined" ? localStorage.getItem("country") : null;

    values.country_code = country;

    if (country === "null") {
      values.is_world = true;
    }

    postData({
      url: `${ApiUrl}surveys`,
      data: { ...values, type: "normal" },
    })
      .then((response) => {
        setLoading(false);
        if (Number(response?.code) == 200) {
          notification.success({ message: t("msg.success_survey_add") });
          history.push("/");
        }
      })
      .catch((err) => {
        if (err.message === "msg.error_not_allowed_country") {
          notification.error({
            message: t("msg.error_unauthorized_country"),
          });
        } else {
          notification.error({ message: t("msg.error_survey_add") });
        }
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="Survey">
        <Card title={t("lbl.add_survey")} bordered={false}>
          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Form.Item
              className="mb-20"
              name="category_id"
              label={t("lbl.select_category")}
              style={{ maxWidth: 600 }}
              rules={[
                {
                  required: true,
                  message: t("msg.required_category"),
                },
              ]}
            >
              <CategorySelect newCategory={newCategory} />
            </Form.Item>
            <NewCategory setNewCategory={setNewCategory} />
            <Form.Item
              name="title"
              label={t("survey_title")}
              rules={[
                {
                  required: true,
                  message: t("msg.required_title"),
                },
              ]}
              style={{ maxWidth: 600 }}
            >
              <Input />
            </Form.Item>
            <Divider> {t("lbl.choices")} </Divider>
            <Form.List name="choices">
              {(fields, { add, remove }) => (
                <Choices
                  {...{ fields, add, remove, t, initial: 3 }}
                  form={form}
                />
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {t("save")}
              </Button>
            </Form.Item>
          </Form>
        </Card>
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

export default Choice;
