import { useState, useEffect } from "react";
import { Form, Input, Button, Select, notification, Modal } from "antd";
import { useSelector } from "react-redux";
import { ProfileModel, ProfileSaveModel } from "../../helpers/models";
import { genders, educations, marital } from "../../helpers/constants";
import {
  PhoneInput,
  EmailInput,
  TextArea1,
  DateSelect,
} from "../../components/formElements";
import { Upload } from "../../components";
// import { get } from "../../helpers";
// import { useGet } from "../../hooks";
import { putData, getData } from "../../store/requests/global";
import { updateState } from "../../store/requests/auth";
import fileUpload from "../../helpers/fileUpload";
import { ApiUrl } from "../../config";
// import { useTranslation } from "react-i18next";
import axios from "axios";

const Info = ({ t }) => {
  // const { i18n } = useTranslation();
  // const { data } = useGet({
  //   url: `${ApiUrl}languages`,
  //   key: "languages",
  // });
  const [smsCode, setCode] = useState("");
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");
  // const code = i18n.language;
  // const selectedCountry = get(data, "result.set", []).find(
  //   (x) => x.code === code
  // );
  const country =
    typeof window !== "undefined" ? localStorage.getItem("country") : null;
  const user = useSelector((state) => state.auth.account);
  // const languages = useSelector((state) => state.global.languages.data);
  // const { data: cities, loading: cityLoading } = useGet({
  //   url: `${ApiUrl}citiesOfCountry/${user && user?.country_id}`,
  // });
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState(
    (user && user.user_details?.gender) || ""
  );
  const [education, setEducation] = useState(
    (user && user.user_details?.education) || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    (user && user.user_details?.phone_number) || ""
  );
  const [birthdate, setBirthDate] = useState(
    (user && user.user_details?.birthdate) || ""
  );
  const [city, setCity] = useState((user && user.city_id) || "");
  const [testCity, setCities] = useState([]);
  const [currentCountry, setCountries] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!user || !user.country_id) return;

    const session = localStorage.getItem("session");
    const token = localStorage.getItem("token");
    const contact = user && user.user_details?.phone_number;
    if (session && token && !contact) {
      notification.error({ message: t("mobile_verification_warning") });
    }
    if (!user || !user.country_id) return;
    axios
      .get(`${ApiUrl}citiesOfCountry/${user && user.country_id}`)
      .then((response) => {
        setCities(response.data?.result?.set || []);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
    axios
      .get(`${ApiUrl}languages`)
      .then((response) => {
        setCountries(response.data?.result?.set || []);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, [user]);

  if (!user) {
    // Redirect inside useEffect or render null/loading
    useEffect(() => {
      window.location.href = "/";
    }, []);
    return null;
  }

  const handlePhoneInputChange = (token, uid) => {
    setToken(token);
    setUid(uid);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const data = new ProfileSaveModel(values);

    data.user_details.profile_image = await fileUpload(
      data.user_details?.profile_image,
      "us"
    );

    putData({
      url: `${ApiUrl}profile`,
      data: {
        user: data,
        country,
        sms_verify_code: smsCode,
        idToken: token,
        user_uid: uid,
      },
    })
      .then(() => {
        setLoading(false);
        updateState({ key: "account", data: { ...user, ...data } });
        notification.success({
          message: t("msg.success_profile_update"),
        });
      })
      .catch(() => {
        setLoading(false);
        notification.error({ message: t("msg.error_profile_update") });
      });
  };

  const onDelete = () => {
    Modal.confirm({
      title: t("lbl.delete_account"),
      content: t("lbl.delete_account_text"),
      onOk: () => {
        if (user) {
          getData({
            url: `${ApiUrl}delete-my-account`,
          })
            .then(() => {
              notification.success({
                message: t("msg.success_delete_account"),
              });
            })
            .catch(() => {
              notification.success({
                message: t("msg.error_delete_account"),
              });
            });
        } else {
          notification.success({
            message: t("msg.success_delete_account"),
          });
        }
      },
    });
  };

  return (
    <div className="ProfileInfo">
      <div style={{ maxWidth: 600 }}>
        <Form
          form={form}
          initialValues={new ProfileModel(user)}
          labelCol={{ style: { width: 160 } }}
          labelAlign="left"
          onFinish={onSubmit}
        >
          <Form.Item name="profile_image">
            <Upload type="us" />
          </Form.Item>
          <Form.Item name="username" label={t("lbl.username")}>
            <Input placeholder="this is placeholder" disabled />
          </Form.Item>
          <Form.Item name="firstname" label={t("lbl.firstname")}>
            <Input placeholder={t("lbl.firstname")} />
          </Form.Item>
          <Form.Item name="middlename" label={t("lbl.middlename")}>
            <Input placeholder={t("lbl.middlename")} />
          </Form.Item>
          <Form.Item name="lastname" label={t("lbl.lastname")}>
            <Input placeholder={t("lbl.lastname")} />
          </Form.Item>
          {/* <Form.Item name="phone_number" label={t("lbl.phone_number")}>
            <PhoneInput
              valid
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e)}
            />
          </Form.Item> */}
          <Form.Item
            name="phone_number"
            label={t("lbl.phone_number")}
            rules={[
              { required: true, message: t("msg.required_phone_number") },
            ]}
            validateTrigger={["onBlur", "onSubmit"]}
            style={{ marginBottom: "20px" }}
          >
            <PhoneInput
              valid
              country={country}
              onSms={(e) => setCode(e)}
              value={phoneNumber}
              onPhoneInputChange={handlePhoneInputChange}
            />
          </Form.Item>
          <Form.Item name="birthdate" label={t("lbl.birthdate")}>
            <DateSelect
              value={birthdate}
              onChange={(e) => setBirthDate(e)}
              smsCode={smsCode ? smsCode : null}
            />
          </Form.Item>
          {/* <DatePicker /> */}
          <Form.Item name="gender" label={t("lbl.gender")}>
            <Select
              options={genders.map((x) => ({
                label: t(x.label),
                value: x.value,
              }))}
              className={!gender && smsCode ? "required_field" : ""}
              onChange={(e) => setGender(e)}
            />
          </Form.Item>
          <Form.Item name="education" label={t("lbl.education")}>
            <Select
              options={educations.map((x) => ({
                label: t(x.label),
                value: x.value,
              }))}
              className={!education && smsCode ? "required_field" : ""}
              onChange={(e) => setEducation(e)}
            />
          </Form.Item>
          <Form.Item name="country_id" label={t("lbl.country")}>
            {/* <Select
            //defaultValue={user.country_id}
            options={get(languages, 'result.set', []).map(
              (x) => ({
                label: x.name,
                value: x.id.toString(),
              })
            )}
            disabled
          /> */}
            <Select disabled value="">
              {currentCountry.map((country, index) => (
                <Select.Option key={index} value={country.id}>
                  {country.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="city_id" label={t("lbl.city")}>
            {/* <Select
              // defaultValue={city}
              options={get(cities, "result.set", []).map((x) => ({
                label: x.name,
                value: x.id.toString(),
              }))}
              loading={cityLoading}
              className={city ? "" : "required_field"}
              onChange={(e) => setCity(e)}
            /> */}

            <Select
              value={city || ""}
              className={!city && smsCode ? "required_field" : ""}
            >
              {testCity.map((city, index) => (
                <Select.Option key={index} value={city.id}>
                  {city.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="email" label={t("lbl.email")}>
            <EmailInput />
          </Form.Item>
          <Form.Item name="occupation" label={t("lbl.occupation")}>
            <Input placeholder={t("lbl.occupation")} />
          </Form.Item>
          <Form.Item name="marital_status" label={t("lbl.marital_status")}>
            <Select
              options={marital.map((x) => ({
                label: t(x.label),
                value: x.value,
              }))}
            />
          </Form.Item>
          <Form.Item name="about" label={t("lbl.about")}>
            <TextArea1 placeholder={t("lbl.about")} maxLength={1000} />
          </Form.Item>
          <Form.Item name="facebook_url" label={t("lbl.facebook_url")}>
            <Input placeholder={t("lbl.facebook_url")} />
          </Form.Item>
          <Form.Item name="instagram_url" label={t("lbl.instagram_url")}>
            <Input placeholder={t("lbl.instagram_url")} />
          </Form.Item>
          <Form.Item name="twitter_url" label={t("lbl.twitter_url")}>
            <Input placeholder={t("lbl.twitter_url")} />
          </Form.Item>
          <Form.Item name="skype_url" label={t("lbl.skype_url")}>
            <Input placeholder={t("lbl.skype_url")} />
          </Form.Item>
          <Form.Item name="web_url" label={t("lbl.web_url")}>
            <Input placeholder={t("lbl.web_url")} />
          </Form.Item>
          <Form.Item name="another_url" label={t("lbl.another_url")}>
            <Input placeholder={t("lbl.another_url")} />
          </Form.Item>
          <Form.Item>
            <div className="d-flex">
              <Button
                type="link"
                className="text-red pl-0 pr-0"
                onClick={onDelete}
              >
                {t("lbl.delete_account")}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="ml-auto"
                loading={loading}
              >
                {t("save")}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  putData({
    url: `${ApiUrl}profile`,
    data: { user: data },
  })
    .then(() => {
      setLoading(false);
      updateState({ key: "account", data: { ...user, ...data } });
      notification.success({
        message: t("msg.success_profile_update"),
      });
    })
    .catch(() => {
      setLoading(false);
      notification.error({ message: t("msg.error_profile_update") });
    });
  return {
    props: {},
  };
};

export default Info;
