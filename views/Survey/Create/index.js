import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Form, Input, Button, Divider, notification } from "antd";
import { CategorySelect } from "../../../components/formElements";
import { NewCategory } from "../../../components";
import Choices from "./Choices";
import { postData } from "../../../store/requests/global";
import fileUpload from "../../../helpers/fileUpload";
import {ApiUrl} from '../../../config';
import { useRouter } from "next/router";

export default function ChoiceMain(props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState(null);
  const history = useRouter();

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="Survey">
      <Card title={t('add_survey')} bordered={false}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="category_id"
            label={t('select_category')}
            style={{ maxWidth: 600 }}
            rules={[
              {
                required: true,
                message: t("Category is required."),
              },
            ]}
          >
            <CategorySelect newCategory={newCategory} />
          </Form.Item>
          <NewCategory setNewCategory={setNewCategory} />
          <Form.Item
            name="title"
            label={t('survey_title')}
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
          <Divider>{t('choices')}</Divider>
          <Form.List name="choices">
            {(fields, { add, remove }) => (
              <Choices
                {...{ fields, add, remove, t, initial: 2 }}
                form={form}
              />
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t('save')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
