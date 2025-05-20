import React, { useState } from "react";
import { Upload } from "antd";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";
import { postData } from "../../store/requests/global";
import { urls } from "../../helpers/constants";
import Image from "next/image";
import {ApiUrl, ImageUrl} from '../../config';

const UploadData = React.forwardRef(({ value, onChange, type = "sa" }, ref) => {
  //const [src, setSrc] = useState(value || "");
  const [src, setSrc] = useState(
    value
      ? `${ImageUrl}${urls[type]}/${value}`
      :''
  );
  const [loading, setLoading] = useState(false);
  const options = {
    className: "SurveyUpload",
    listType: "picture-card",
    accept: ".jpeg, .jpg, .png",
    showUploadList: false,
    action: `${ApiUrl}file/upload`,
    //action: `${process.env.REACT_APP_API_URL}file/upload`,
    headers: {
      Authorization: `Bearer ${ typeof window !== "undefined" ? localStorage.getItem("token") : null}`,
    },
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const beforeUpload = async (file) => {
    let previewImage = await getBase64(file);
    setSrc(previewImage);
    onChange && onChange(file);

    return false;
  };

  const handleChange = async ({ file, fileList }) => {
    let previewImage = await getBase64(file);
    setSrc(previewImage);
    onChange && onChange(file);
  };

  return (
    <Upload
      cl
      {...options}
      //beforeUpload={beforeUpload}
      beforeUpload={() => false}
      onChange={handleChange}
    >
      {src ? (
        <Image
          // src={`${ImageUrl}${urls[type]}/${src}`}
          src={value?`${src}`:''}
          //src={`${process.env.REACT_APP_CDN_URL}images/${urls[type]}/${src}`}
          alt=""
          width={100}
          height={100}
        />
      ) : loading ? (
        <LoadingOutlined />
      ) : (
        <CameraOutlined />
      )}
    </Upload>
  );
});

UploadData.displayName = "UploadData";

export default UploadData;