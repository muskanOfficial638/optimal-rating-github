import React, { useState } from "react";
import { Form, Input, Button, Rate, Divider } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Upload } from "../../../components";
import { TextArea } from "../../../components/formElements";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function ChoiceImage({ fields = [], add, remove, t, initial = 3, form }) {
  const [descriptionLength, setDescriptionLength] = useState(0);
  // console.log("changes 12");
  // console.log("Form Values:", form.getFieldsValue());

  return (
    <div>
      <div className="SurveyChoices">
        {fields &&
          fields.map((field, index) => (
            <div key={field.key} className="SurveyChoice" style={{padding:"20px"}}>
              <div className="ChoiceImage">
                <Form.Item
                  name={[field.name, "id"]}
                  fieldKey={[field.fieldKey, "id"]}
                  initialValue={null}
                  className="d-none"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label=" "
                  name={[field.name, "choice_image"]}
                  fieldKey={[field.fieldKey, "choice_image"]}
                  rules={[
                    {
                      required: true,
                      message: t("msg.candidate_image_required"),
                    },
                  ]}
                >
                  <Upload />
                </Form.Item>
                <Form.Item
                  name={[field.name, "marking"]}
                  fieldKey={[field.fieldKey, "marking"]}
                  rules={[
                    {
                      validator: async (_, marking) => {
                        if (!marking || marking === 0) {
                          return Promise.reject(
                            new Error(t("msg.rating_required"))
                          );
                        }
                      },
                    },
                  ]}
                >
                  <Rate />
                </Form.Item>
              </div>
              <div className="ChoiceInfo">
                <Form.Item
                  className="mb-20"
                  label={t("lbl.name")}
                  name={[field.name, "choice_title"]}
                  fieldKey={[field.fieldKey, "choice_title"]}
                  rules={[
                    {
                      required: true,
                      message: t("msg.required_title"),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                {/* <Form.Item
                  label={t("lbl.description")}
                  name={[field.name, "choice_description"]}
                  fieldKey={[field.fieldKey, "choice_description"]}
                  rules={[
                    {
                      required: true,
                      message: t("msg.required_description"),
                    },
                    {
                      validator: async (_, choice_description) => {
                        if (
                          choice_description?.replace(/(<([^>]+)>)/gi, "")
                            .length > 1000
                        ) {
                          return Promise.reject(
                            new Error(t("msg.error_exceed_max_character"))
                          );
                        }
                      },
                    },
                  ]}
                >
                  <ReactQuill
                    onChange={(content, delta, source, editor) => {
                      editor.getLength() - 1 === 0
                        ? form.setFieldsValue({
                            choice_description: null,
                          })
                        : form.setFieldsValue({
                            choice_description: content,
                          });
                      form.setFieldsValue({
                        choice_description_length: editor.getLength() - 1,
                      });
                      setDescriptionLength(editor.getLength() - 1);
                    }}
                  />

                  // <TextArea maxLength={1000} form={form} key={index} /> 
                </Form.Item> */}

                <Form.Item
                  label={t("lbl.description")}
                  name={[field.name, "choice_description"]}
                  fieldKey={[field.fieldKey, "choice_description"]}
                  rules={[
                    {
                      required: true,
                      message: t("msg.required_description"),
                    },
                    {
                      validator: async (_, choice_description) => {
                        if (
                          choice_description?.replace(/(<([^>]+)>)/gi, "")
                            .length > 1000
                        ) {
                          return Promise.reject(
                            new Error(t("msg.error_exceed_max_character"))
                          );
                        }
                      },
                    },
                  ]}
                >
                  <ReactQuill
                    value={
                      form.getFieldValue([
                        "choices",
                        field.name,
                        "choice_description",
                      ]) || ""
                    }
                    
                    onChange={(content, delta, source, editor) => {
                      // console.log("Quill Content:", content);
                    
                      // Ensure ReactQuill gets HTML, not Delta
                      const htmlContent = content || ""; // Quill outputs HTML
                    
                      const currentChoices = form.getFieldValue("choices") || [];
                    
                      // Ensure the field is always an object, not undefined
                      const updatedChoices = currentChoices.map((choice, idx) =>
                        idx === field.name
                          ? {
                              ...choice,
                              choice_description: htmlContent, // ✅ Use HTML instead of Delta
                              choice_description_length: editor.getLength() - 1,
                            }
                          : choice ?? {} // If choice is undefined, replace it with an empty object
                      );
                    
                      form.setFieldsValue({
                        choices: updatedChoices, // ✅ Set updated choices ensuring no undefined fields
                      });
                    
                      setDescriptionLength(editor.getLength() - 1);
                    }}
                    
                  />
                </Form.Item>
              </div>
              {index > initial && (
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => remove(field.name)}
                  //style={{margin: 'auto'}}
                />
              )}
            </div>
          ))}
      </div>
      <Divider />
      <div className="text-center">
        <Button icon={<PlusOutlined />} 
        // onClick={() => add()}
        onClick={() => {
          const currentChoices = form.getFieldValue("choices") || [];
          form.setFieldsValue({
            choices: [
              ...currentChoices,
              { id: null, choice_image: "", marking: null, choice_title: "", choice_description: "" },
            ], // ✅ Ensure new choice is not undefined
          });
        }}
        >
          {t("lbl.new_choice")}
        </Button>
      </div>
    </div>
  );
}
