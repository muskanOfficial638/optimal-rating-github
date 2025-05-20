// import React, { useState } from "react";
// import { Button, Modal, Form, Input, notification, Rate } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { Upload, Permission } from "../../components";
// import { postData } from "../../store/requests/global";
// import { useTranslation } from "react-i18next";
// import fileUpload from "../../helpers/fileUpload";
// import { TextArea } from "../../components/formElements";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";
// import {ApiUrl} from '../../config';

// const NewSurvey = ({ surveyId }) => {
//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [descriptionLength, setDescriptionLength] = useState(0);
//   const [form] = Form.useForm();
//   const { t } = useTranslation();

//   const onSubmit = () => {
//     form
//       .validateFields()
//       .then(async (values) => {
//         setLoading(true);

//         values.choice_image = await fileUpload(values.choice_image, "sa");

//         return postData({
//           url: `${ApiUrl}addChoice/${surveyId}`,
//           data: values,
//         });
//       })
//       .then(() => {
//         notification.success({
//           message: t("msg.success_choice_add"),
//         });
//         setVisible(false);
//         setLoading(false);
//       })
//       .catch((err) => {
//         if (err.message === "msg.error_unauthorized_country") {
//           notification.error({
//             message: t("msg.error_unauthorized_country"),
//           });
//         } else {
//           notification.error({ message: t("msg.error_choice_add") });
//         }
//         setLoading(false);
//       });
//   };

//   return (
//     <>
//      {visible &&  <Permission showChild type="agreement" callback={() => setVisible(true)}>
//         <Button type="link" icon={<PlusOutlined />}>
//           {t("lbl.new_choice")}
//         </Button>
//       </Permission>}
//       {visible &&  <Modal
//         width={600}
//         visible={visible}
//         title={t("lbl.add_new_option")}
//         onOk={onSubmit}
//         onCancel={() => {
//           form.resetFields();
//           setDescriptionLength(0);
//           setVisible(false);
//         }}
//         okButtonProps={{ loading }}
//       >
//         <Form
//           layout="vertical"
//           labelAlign="left"
//           form={form}
//           className="d-flex"
//           onFinish={onSubmit}
//         >
//           <Form.Item
//             name="choice_image"
//             className="pt-20"
//             rules={[
//               {
//                 required: true,
//                 message: t("msg.candidate_image_required"),
//               },
//             ]}
//           >
//             <Upload />
//           </Form.Item>
//           <div className="ml-10 f-1">
//             <Form.Item
//               name="choice_title"
//               label={t("lbl.name")}
//               rules={[
//                 {
//                   required: true,
//                   message: t("msg.required_title"),
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="choice_description"
//               label={t("lbl.description")}
//               rules={[
//                 {
//                   required: true,
//                   message: t("msg.required_description"),
//                 },
//                 {
//                   validator: async (_, choice_description) => {
//                     if (descriptionLength > 1000) {
//                       return Promise.reject(
//                         new Error(t("msg.error_exceed_max_character"))
//                       );
//                     }
//                   },
//                 },
//               ]}
//             >
//               {/* <TextArea maxLength={1000} /> */}
//               <ReactQuill
//                 onChange={(content, delta, source, editor) => {
//                   editor.getLength() - 1 === 0
//                     ? form.setFieldsValue({
//                         choice_description: null,
//                       })
//                     : form.setFieldsValue({
//                         choice_description: content,
//                       });
//                   setDescriptionLength(editor.getLength() - 1);
//                 }}
//               />
//               <span>{`${descriptionLength} / 1000`}</span>
//             </Form.Item>
//             <Form.Item
//               name="marking"
//               initialValue={null}
//               label={t("lbl.rate")}
//               rules={[
//                 {
//                   validator: async (_, marking) => {
//                     if (!marking || marking === 0) {
//                       return Promise.reject(
//                         new Error(t("msg.rating_required"))
//                       );
//                     }
//                   },
//                 },
//               ]}
//             >
//               <Rate />
//             </Form.Item>
//           </div>
//         </Form>
//       </Modal>}
//     </>
//   );
// };
// export default NewSurvey;

//edited by MUSKAN

import React, { useState } from "react";
import { Button, Modal, Form, Input, notification, Rate } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Permission } from "../../components";
import { postData } from "../../store/requests/global";
import { useTranslation } from "react-i18next";
import fileUpload from "../../helpers/fileUpload";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({ surveyId }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      setLoading(true);
      values.choice_image = await fileUpload(values.choice_image, "sa");
      postData({ url: `addChoice/${surveyId}`, data: values })
        .then(() => {
          notification.success({ message: t("msg.success_choice_add") });
          setVisible(false);
          setLoading(false);
        })
        .catch((err) => {
          if (err.message === "msg.error_unauthorized_country") {
            notification.error({
              // message: t("msg.error_unauthorized_country"),
              message: t("msg.error_unauthorized_choice"), //updated
            });
          } else {
            notification.error({ message: t("msg.error_choice_add") });
          }
          setLoading(false);
        });
    });
  };

  return (
    <>
      <Permission showChild type="agreement" callback={() => setVisible(true)}>
        <Button type="link" icon={<PlusOutlined />}>
          {t("lbl.new_choice")}
        </Button>
      </Permission>
      <Modal
        width={600}
        visible={visible}
        title={t("lbl.add_new_option")}
        onOk={onSubmit}
        onCancel={() => setVisible(false)}
        okButtonProps={{ loading }}
      >
        <Form
          layout="vertical"
          labelAlign="left"
          form={form}
          className="d-flex"
          onFinish={onSubmit}
        >
          <Form.Item
            name="choice_image"
            className="pt-20"
            rules={[{ required: true, message: " " }]}
          >
            <Upload />
          </Form.Item>
          <div className="ml-10 f-1">
            <Form.Item
              name="choice_title"
              label={t("lbl.name")}
              rules={[{ required: true, message: t("msg.required_title") }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="choice_description"
              label={t("lbl.description")}
              rules={[
                { required: true, message: t("msg.required_description") },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="marking" initialValue={0} label={t("lbl.rate")}>
              <Rate />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
