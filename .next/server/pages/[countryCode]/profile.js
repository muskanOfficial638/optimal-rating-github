(function() {
var exports = {};
exports.id = 647;
exports.ids = [647];
exports.modules = {

/***/ 9752:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ profile; },
  "getServerSideProps": function() { return /* binding */ profile_getServerSideProps; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(953);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(2372);
// EXTERNAL MODULE: external "react-i18next"
var external_react_i18next_ = __webpack_require__(7789);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(79);
;// CONCATENATED MODULE: ./helpers/models.js
class LoginModel {
  constructor(data = null) {
    this.email = data ? data.email : '';
    this.password = data ? data.password : '';
  }

}
;
class RegisterModel {
  constructor(data = null) {
    this.email = data ? data.email : '';
    this.password = data ? data.password : '';
    this.confirm = data ? data.confirm : '';
  }

}
;
class ProfileModel {
  constructor(data) {
    var _data$user_details, _data$user_details2, _data$user_details3, _data$user_details4, _data$user_details5, _data$user_details6, _data$user_details7, _data$user_details8, _data$user_details9, _data$user_details10, _data$user_details11, _data$user_details12, _data$user_details13, _data$user_details14, _data$user_details15, _data$user_details16, _data$user_details17, _data$user_details18, _data$user_details19, _data$user_details20;

    this.username = data && data.username || '';
    this.firstname = data && data.firstname || '';
    this.middlename = data && data.middlename || '';
    this.lastname = data && data.lastname || '';
    this.year = data && (_data$user_details = data.user_details) !== null && _data$user_details !== void 0 && _data$user_details.birthdate ? (_data$user_details2 = data.user_details) === null || _data$user_details2 === void 0 ? void 0 : _data$user_details2.birthdate.split('-')[0] : null;
    this.month = data && (_data$user_details3 = data.user_details) !== null && _data$user_details3 !== void 0 && _data$user_details3.birthdate ? (_data$user_details4 = data.user_details) === null || _data$user_details4 === void 0 ? void 0 : _data$user_details4.birthdate.split('-')[1] : null;
    this.day = data && (_data$user_details5 = data.user_details) !== null && _data$user_details5 !== void 0 && _data$user_details5.birthdate ? (_data$user_details6 = data.user_details) === null || _data$user_details6 === void 0 ? void 0 : _data$user_details6.birthdate.split('-')[2] : null;
    this.birthdate = data && ((_data$user_details7 = data.user_details) === null || _data$user_details7 === void 0 ? void 0 : _data$user_details7.birthdate) || '';
    this.profile_image = data && ((_data$user_details8 = data.user_details) === null || _data$user_details8 === void 0 ? void 0 : _data$user_details8.profile_image) || '';
    this.gender = data && ((_data$user_details9 = data.user_details) === null || _data$user_details9 === void 0 ? void 0 : _data$user_details9.gender) || '';
    this.education = data && ((_data$user_details10 = data.user_details) === null || _data$user_details10 === void 0 ? void 0 : _data$user_details10.education) || '';
    this.country_id = data && data.country_id || '';
    this.city_id = data && data.city_id || '';
    this.phone_number = data && ((_data$user_details11 = data.user_details) === null || _data$user_details11 === void 0 ? void 0 : _data$user_details11.phone_number) || '';
    this.email = data && data.email || '';
    this.occupation = data && ((_data$user_details12 = data.user_details) === null || _data$user_details12 === void 0 ? void 0 : _data$user_details12.occupation) || '';
    this.marital_status = data && ((_data$user_details13 = data.user_details) === null || _data$user_details13 === void 0 ? void 0 : _data$user_details13.marital_status) || '';
    this.about = data && ((_data$user_details14 = data.user_details) === null || _data$user_details14 === void 0 ? void 0 : _data$user_details14.about) || '';
    this.facebook_url = data && ((_data$user_details15 = data.user_details) === null || _data$user_details15 === void 0 ? void 0 : _data$user_details15.facebook_url) || '';
    this.instagram_url = data && ((_data$user_details16 = data.user_details) === null || _data$user_details16 === void 0 ? void 0 : _data$user_details16.instagram_url) || '';
    this.twitter_url = data && ((_data$user_details17 = data.user_details) === null || _data$user_details17 === void 0 ? void 0 : _data$user_details17.twitter_url) || '';
    this.skype_url = data && ((_data$user_details18 = data.user_details) === null || _data$user_details18 === void 0 ? void 0 : _data$user_details18.skype_url) || '';
    this.web_url = data && ((_data$user_details19 = data.user_details) === null || _data$user_details19 === void 0 ? void 0 : _data$user_details19.web_url) || '';
    this.another_url = data && ((_data$user_details20 = data.user_details) === null || _data$user_details20 === void 0 ? void 0 : _data$user_details20.another_url) || '';
  }

}
;
class ProfileSaveModel {
  constructor(data) {
    this.username = data && data.username || '';
    this.firstname = data && data.firstname || '';
    this.middlename = data && data.middlename || '';
    this.lastname = data && data.lastname || '';
    this.country_id = data && data.country_id || null;
    this.city_id = data && data.city_id || '';
    this.national_image = null;
    this.portrait_image = data && data.portrait_image || '';
    this.user_details = {
      birthdate: data && data.birthdate || '',
      gender: data.gender || '',
      education: data && data.education || '',
      phone_number: data && data.phone_number || '',
      occupation: data && data.occupation || '',
      marital_status: data && data.marital_status || '',
      about: data && data.about || '',
      facebook_url: data && data.facebook_url || '',
      instagram_url: data && data.instagram_url || '',
      twitter_url: data && data.twitter_url || '',
      skype_url: data && data.skype_url || '',
      web_url: data && data.web_url || '',
      profile_image: data && data.profile_image || '',
      another_url: data && data.another_url || ''
    };
  }

}
;
class ChoiceModel {
  constructor() {
    this.choice_title = '';
    this.choice_description = '';
    this.marking = 0;
    this.image = '';
  }

}
;
// EXTERNAL MODULE: ./helpers/constants.js
var constants = __webpack_require__(5158);
// EXTERNAL MODULE: ./components/formElements/index.js + 7 modules
var formElements = __webpack_require__(8801);
// EXTERNAL MODULE: ./components/index.js + 30 modules
var components = __webpack_require__(9226);
// EXTERNAL MODULE: ./store/requests/global.js
var global = __webpack_require__(8318);
// EXTERNAL MODULE: ./store/requests/auth.js
var auth = __webpack_require__(8407);
// EXTERNAL MODULE: ./helpers/fileUpload.js
var helpers_fileUpload = __webpack_require__(5688);
// EXTERNAL MODULE: ./config/index.js
var config = __webpack_require__(1130);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./views/Profile/Info.js



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







 // import { get } from "../../helpers";
// import { useGet } from "../../hooks";




 // import { useTranslation } from "react-i18next";



const Info = ({
  t
}) => {
  var _user$user_details, _user$user_details2, _user$user_details3, _user$user_details4;

  // const { i18n } = useTranslation();
  // const { data } = useGet({
  //   url: `${ApiUrl}languages`,
  //   key: "languages",
  // });
  const {
    0: smsCode,
    1: setCode
  } = (0,external_react_.useState)("");
  const {
    0: token,
    1: setToken
  } = (0,external_react_.useState)("");
  const {
    0: uid,
    1: setUid
  } = (0,external_react_.useState)(""); // const code = i18n.language;
  // const selectedCountry = get(data, "result.set", []).find(
  //   (x) => x.code === code
  // );

  const country =  false ? 0 : null;
  const user = (0,external_react_redux_.useSelector)(state => state.auth.account); // const languages = useSelector((state) => state.global.languages.data);
  // const { data: cities, loading: cityLoading } = useGet({
  //   url: `${ApiUrl}citiesOfCountry/${user && user?.country_id}`,
  // });

  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(false);
  const {
    0: gender,
    1: setGender
  } = (0,external_react_.useState)(user && ((_user$user_details = user.user_details) === null || _user$user_details === void 0 ? void 0 : _user$user_details.gender) || "");
  const {
    0: education,
    1: setEducation
  } = (0,external_react_.useState)(user && ((_user$user_details2 = user.user_details) === null || _user$user_details2 === void 0 ? void 0 : _user$user_details2.education) || "");
  const {
    0: phoneNumber,
    1: setPhoneNumber
  } = (0,external_react_.useState)(user && ((_user$user_details3 = user.user_details) === null || _user$user_details3 === void 0 ? void 0 : _user$user_details3.phone_number) || "");
  const {
    0: birthdate,
    1: setBirthDate
  } = (0,external_react_.useState)(user && ((_user$user_details4 = user.user_details) === null || _user$user_details4 === void 0 ? void 0 : _user$user_details4.birthdate) || "");
  const {
    0: city,
    1: setCity
  } = (0,external_react_.useState)(user && user.city_id || "");
  const {
    0: testCity,
    1: setCities
  } = (0,external_react_.useState)([]);
  const {
    0: currentCountry,
    1: setCountries
  } = (0,external_react_.useState)([]);
  const [form] = external_antd_.Form.useForm();
  (0,external_react_.useEffect)(() => {
    var _user$user_details5;

    if (!user || !user.country_id) return;
    const session = localStorage.getItem("session");
    const token = localStorage.getItem("token");
    const contact = user && ((_user$user_details5 = user.user_details) === null || _user$user_details5 === void 0 ? void 0 : _user$user_details5.phone_number);

    if (session && token && !contact) {
      external_antd_.notification.error({
        message: t("mobile_verification_warning")
      });
    }

    if (!user || !user.country_id) return;
    external_axios_default().get(`${config/* ApiUrl */.lp}citiesOfCountry/${user && user.country_id}`).then(response => {
      var _response$data, _response$data$result;

      setCities(((_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$result = _response$data.result) === null || _response$data$result === void 0 ? void 0 : _response$data$result.set) || []);
    }).catch(error => {
      console.error("Error fetching cities:", error);
    });
    external_axios_default().get(`${config/* ApiUrl */.lp}languages`).then(response => {
      var _response$data2, _response$data2$resul;

      setCountries(((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : (_response$data2$resul = _response$data2.result) === null || _response$data2$resul === void 0 ? void 0 : _response$data2$resul.set) || []);
    }).catch(error => {
      console.error("Error fetching countries:", error);
    });
  }, [user, t]);
  (0,external_react_.useEffect)(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handlePhoneInputChange = (token, uid) => {
    setToken(token);
    setUid(uid);
  };

  const onSubmit = async values => {
    var _data$user_details;

    setLoading(true);
    const data = new ProfileSaveModel(values);
    data.user_details.profile_image = await (0,helpers_fileUpload/* default */.Z)((_data$user_details = data.user_details) === null || _data$user_details === void 0 ? void 0 : _data$user_details.profile_image, "us");
    (0,global/* putData */.fP)({
      url: `${config/* ApiUrl */.lp}profile`,
      data: {
        user: data,
        country,
        sms_verify_code: smsCode,
        idToken: token,
        user_uid: uid
      }
    }).then(() => {
      setLoading(false);
      (0,auth/* updateState */.xq)({
        key: "account",
        data: _objectSpread(_objectSpread({}, user), data)
      });
      external_antd_.notification.success({
        message: t("msg.success_profile_update")
      });
    }).catch(() => {
      setLoading(false);
      external_antd_.notification.error({
        message: t("msg.error_profile_update")
      });
    });
  };

  const onDelete = () => {
    external_antd_.Modal.confirm({
      title: t("lbl.delete_account"),
      content: t("lbl.delete_account_text"),
      onOk: () => {
        if (user) {
          (0,global/* getData */.Yu)({
            url: `${config/* ApiUrl */.lp}delete-my-account`
          }).then(() => {
            external_antd_.notification.success({
              message: t("msg.success_delete_account")
            });
          }).catch(() => {
            external_antd_.notification.success({
              message: t("msg.error_delete_account")
            });
          });
        } else {
          external_antd_.notification.success({
            message: t("msg.success_delete_account")
          });
        }
      }
    });
  };

  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "ProfileInfo",
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      style: {
        maxWidth: 600
      },
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Form, {
        form: form,
        initialValues: new ProfileModel(user),
        labelCol: {
          style: {
            width: 160
          }
        },
        labelAlign: "left",
        onFinish: onSubmit,
        children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "profile_image",
          children: /*#__PURE__*/jsx_runtime_.jsx(components/* Upload */.gq, {
            type: "us"
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "username",
          label: t("lbl.username"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {
            placeholder: "this is placeholder",
            disabled: true
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "firstname",
          label: t("lbl.firstname"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {
            placeholder: t("lbl.firstname")
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "middlename",
          label: t("lbl.middlename"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {
            placeholder: t("lbl.middlename")
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "lastname",
          label: t("lbl.lastname"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {
            placeholder: t("lbl.lastname")
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "phone_number",
          label: t("lbl.phone_number"),
          rules: [{
            required: true,
            message: t("msg.required_phone_number")
          }],
          validateTrigger: ["onBlur", "onSubmit"],
          style: {
            marginBottom: "20px"
          },
          children: /*#__PURE__*/jsx_runtime_.jsx(formElements/* PhoneInput */.sb, {
            valid: true,
            country: country,
            onSms: e => setCode(e),
            value: phoneNumber,
            onPhoneInputChange: handlePhoneInputChange
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "birthdate",
          label: t("lbl.birthdate"),
          children: /*#__PURE__*/jsx_runtime_.jsx(formElements/* DateSelect */.jo, {
            value: birthdate,
            onChange: e => setBirthDate(e),
            smsCode: smsCode ? smsCode : null
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "gender",
          label: t("lbl.gender"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Select, {
            options: constants/* genders.map */.od.map(x => ({
              label: t(x.label),
              value: x.value
            })),
            className: !gender && smsCode ? "required_field" : "",
            onChange: e => setGender(e)
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "education",
          label: t("lbl.education"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Select, {
            options: constants/* educations.map */.vI.map(x => ({
              label: t(x.label),
              value: x.value
            })),
            className: !education && smsCode ? "required_field" : "",
            onChange: e => setEducation(e)
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "country_id",
          label: t("lbl.country"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Select, {
            disabled: true,
            value: "",
            children: currentCountry.map((country, index) => /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Select.Option, {
              value: country.id,
              children: country.name
            }, index))
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "city_id",
          label: t("lbl.city"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Select, {
            value: city || "",
            className: !city && smsCode ? "required_field" : "",
            children: testCity.map((city, index) => /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Select.Option, {
              value: city.id,
              children: city.name
            }, index))
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "email",
          label: t("lbl.email"),
          children: /*#__PURE__*/jsx_runtime_.jsx(formElements/* EmailInput */.U5, {})
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "occupation",
          label: t("lbl.occupation"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {
            placeholder: t("lbl.occupation")
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "marital_status",
          label: t("lbl.marital_status"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Select, {
            options: constants/* marital.map */.IT.map(x => ({
              label: t(x.label),
              value: x.value
            }))
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "about",
          label: t("lbl.about"),
          children: /*#__PURE__*/jsx_runtime_.jsx(formElements/* TextArea1 */.j_, {
            placeholder: t("lbl.about"),
            maxLength: 1000
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "facebook_url",
          label: t("lbl.facebook_url"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {
            placeholder: t("lbl.facebook_url")
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "instagram_url",
          label: t("lbl.instagram_url"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {
            placeholder: t("lbl.instagram_url")
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "twitter_url",
          label: t("lbl.twitter_url"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {
            placeholder: t("lbl.twitter_url")
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "skype_url",
          label: t("lbl.skype_url"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {
            placeholder: t("lbl.skype_url")
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "web_url",
          label: t("lbl.web_url"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {
            placeholder: t("lbl.web_url")
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "another_url",
          label: t("lbl.another_url"),
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {
            placeholder: t("lbl.another_url")
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "d-flex",
            children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
              type: "link",
              className: "text-red pl-0 pr-0",
              onClick: onDelete,
              children: t("lbl.delete_account")
            }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
              type: "primary",
              htmlType: "submit",
              className: "ml-auto",
              loading: loading,
              children: t("save")
            })]
          })
        })]
      })
    })
  });
};

const getServerSideProps = async () => {
  putData({
    url: `${ApiUrl}profile`,
    data: {
      user: data
    }
  }).then(() => {
    setLoading(false);
    updateState({
      key: "account",
      data: _objectSpread(_objectSpread({}, user), data)
    });
    notification.success({
      message: t("msg.success_profile_update")
    });
  }).catch(() => {
    setLoading(false);
    notification.error({
      message: t("msg.error_profile_update")
    });
  });
  return {
    props: {}
  };
};
/* harmony default export */ var Profile_Info = (Info);
;// CONCATENATED MODULE: ./views/Profile/Friends/Friend.js




function Friend({
  data
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "Friend",
    children: [/*#__PURE__*/jsx_runtime_.jsx(components/* UserAvatar */.Yt, {
      src: data.user_details.profile_image,
      className: "mr-10"
    }), /*#__PURE__*/jsx_runtime_.jsx(components/* UserLink */.DL, {
      data: data,
      popover: false
    }), /*#__PURE__*/jsx_runtime_.jsx(components/* AddRemoveFriend */.a1, {
      id: data.id
    })]
  });
}
;
;// CONCATENATED MODULE: ./views/Profile/Friends/index.js




function FriendMain() {
  const user = (0,external_react_redux_.useSelector)(state => state.auth.account);
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "Friends",
    children: user && user.friends.map(x => /*#__PURE__*/jsx_runtime_.jsx(Friend, {
      data: x.friend
    }, x.id))
  });
}
;
// EXTERNAL MODULE: ./hooks/index.js + 4 modules
var hooks = __webpack_require__(867);
// EXTERNAL MODULE: ./helpers/index.js
var helpers = __webpack_require__(3005);
;// CONCATENATED MODULE: ./views/Profile/Privacy.js










function Privacy({
  t
}) {
  const {
    data,
    loading
  } = (0,hooks/* useGet */.XD)({
    url: `${config/* ApiUrl */.lp}userPrivacySettings`
  });
  const privacyData = (0,helpers/* exists */.Gg)(data, 'result.set.privacies') ? constants/* privacyOrder.map */.Gn.map(i => data.result.set.privacies[i]) : [];
  const userPrivacyData = (0,helpers/* exists */.Gg)(data, 'result.set.user.privacy_settings') ? constants/* privacyOrder.map */.Gn.map(i => data.result.set.user.privacy_settings[i]) : [];

  const onChange = (option, privacy) => {
    (0,global/* postData */.qC)({
      url: `${config/* ApiUrl */.lp}userPrivacySettings`,
      data: {
        option,
        privacy
      }
    }).then(() => {
      external_antd_.notification.success({
        message: t('msg.updated')
      });
    });
  };

  const getValue = (value, options) => {
    var _item;

    let item;
    options.forEach(option => {
      userPrivacyData.forEach(data => {
        if ((option === null || option === void 0 ? void 0 : option.privacy_id) === (data === null || data === void 0 ? void 0 : data.privacy_id)) {
          var _data$option;

          if (((_data$option = data.option) === null || _data$option === void 0 ? void 0 : _data$option.id.toString()) === (option === null || option === void 0 ? void 0 : option.id.toString())) {
            item = option;
          }
        }
      });
    });
    /* options.privacy_id
       options.forEach(element => {
          
      }); */

    /* 	let item = options.find(
    	(x) => x?.id.toString() === value?.id.toString()
    );
    if (!item) item = options.find((x) => x?.option === value?.option); */

    return (_item = item) === null || _item === void 0 ? void 0 : _item.id.toString();
  };

  return /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Spin, {
    spinning: loading,
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "ProfilePrivacy",
      children: [/*#__PURE__*/jsx_runtime_.jsx("h3", {
        className: "text-bold text-grey",
        children: t('lbl.who_can_see')
      }), /*#__PURE__*/jsx_runtime_.jsx(components/* Empty */.HY, {
        isEmpty: !(0,helpers/* exists */.Gg)(data, 'result.set'),
        children: /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "content content-xs ml-0",
          children: /*#__PURE__*/jsx_runtime_.jsx("table", {
            children: /*#__PURE__*/jsx_runtime_.jsx("tbody", {
              children: privacyData.map((x, index) => {
                var _userPrivacyData$inde;

                return /*#__PURE__*/(0,jsx_runtime_.jsxs)("tr", {
                  children: [/*#__PURE__*/jsx_runtime_.jsx("td", {
                    className: "Label",
                    children: t(`lbl.${x.translate_key}`)
                  }), /*#__PURE__*/jsx_runtime_.jsx("td", {
                    className: "Value",
                    children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Select, {
                      style: {
                        pointerEvents: 'all'
                      },
                      className: "full-width",
                      defaultValue: getValue((_userPrivacyData$inde = userPrivacyData[index]) === null || _userPrivacyData$inde === void 0 ? void 0 : _userPrivacyData$inde.option, x.options),
                      onChange: e => onChange(e, x === null || x === void 0 ? void 0 : x.id.toString()),
                      children: x === null || x === void 0 ? void 0 : x.options.map(y => /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Select.Option, {
                        style: {
                          pointerEvents: 'all'
                        },
                        children: t(`lbl.${y === null || y === void 0 ? void 0 : y.option.toLowerCase()}`)
                      }, y === null || y === void 0 ? void 0 : y.id.toString()))
                    })
                  })]
                }, x.id);
              })
            })
          })
        })
      })]
    })
  });
}
;
;// CONCATENATED MODULE: ./views/Profile/Password.js







const Password = ({
  t
}) => {
  const [form] = external_antd_.Form.useForm();
  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(false);

  const validatePassword = ({
    getFieldValue
  }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }

      return Promise.reject(t('msg.error_password_not_match'));
    }

  });

  const onSubmit = values => {
    setLoading(true);
    (0,global/* postData */.qC)({
      url: `${config/* ApiUrl */.lp}check-password`,
      data: {
        password: values.oldPassword
      }
    }).then(() => {
      (0,global/* postData */.qC)({
        url: `${config/* ApiUrl */.lp}password-change`,
        data: {
          password: values.password
        }
      }).then(() => {
        setLoading(false);
        form.resetFields();
        external_antd_.notification.success({
          message: t('msg.success_password_change')
        });
      }).catch(() => {
        setLoading(false);
        external_antd_.notification.error({
          message: t('msg.error_password_change')
        });
      });
    }).catch(() => {
      setLoading(false);
      external_antd_.notification.error({
        message: t('msg.error_old_password_wrong')
      });
    });
  };

  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: "ProfilePassword",
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "content content-xs ml-0",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Form, {
        form: form,
        labelCol: {
          style: {
            width: 140
          }
        },
        labelAlign: "left",
        layout: "horizontal",
        onFinish: onSubmit,
        children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "oldPassword",
          label: t('lbl.old_password'),
          rules: [{
            required: true,
            message: t('msg.required_password')
          }],
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input.Password, {
            placeholder: t('lbl.old_password')
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "password",
          label: t('lbl.new_password'),
          rules: [{
            required: true,
            message: t('msg.required_password')
          }],
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input.Password, {
            placeholder: t('lbl.new_password')
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          name: "confirm",
          label: t('lbl.confirm_password'),
          dependencies: ['password'],
          rules: [{
            required: true,
            message: t('msg.required_confirm_password')
          }, validatePassword],
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input.Password, {
            placeholder: t('lbl.confirm_password')
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
          className: "text-right",
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
            type: "primary",
            htmlType: "submit",
            loading: loading,
            children: t('save')
          })
        })]
      })
    })
  });
};

/* harmony default export */ var Profile_Password = (Password);
// EXTERNAL MODULE: ./layout/index.js + 6 modules
var layout = __webpack_require__(5137);
;// CONCATENATED MODULE: ./pages/[countryCode]/profile.js













const ProfileIndex = ({
  res
}) => {
  const {
    t
  } = (0,external_react_i18next_.useTranslation)();
  const {
    0: active,
    1: setActive
  } = (0,external_react_.useState)("my_profile");
  (0,external_react_.useEffect)(() => {
    (0,global/* seti18n */.mh)(res);
  }, [res]);
  const components = {
    my_profile: /*#__PURE__*/jsx_runtime_.jsx(Profile_Info, {
      t: t
    }),
    friends: /*#__PURE__*/jsx_runtime_.jsx(FriendMain, {
      t: t
    }),
    privacy: /*#__PURE__*/jsx_runtime_.jsx(Privacy, {
      t: t
    }),
    password: /*#__PURE__*/jsx_runtime_.jsx(Profile_Password, {
      t: t
    })
  };

  const getType = type => {
    return active === type ? "primary" : "link";
  };

  const handleSetActive = key => {
    setActive(key);
  };

  return /*#__PURE__*/jsx_runtime_.jsx(layout/* default */.Z, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "User Profile",
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "UserCard",
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Card, {
          bordered: false,
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
            block: true,
            type: getType("my_profile"),
            onClick: () => handleSetActive("my_profile"),
            icon: /*#__PURE__*/jsx_runtime_.jsx(icons_.FormOutlined, {}),
            children: t('my_profile')
          }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
            block: true,
            type: getType("friends"),
            onClick: () => handleSetActive("friends"),
            icon: /*#__PURE__*/jsx_runtime_.jsx(icons_.UserOutlined, {}),
            children: t('friends')
          }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
            block: true,
            type: getType("privacy"),
            onClick: () => handleSetActive("privacy"),
            icon: /*#__PURE__*/jsx_runtime_.jsx(icons_.EyeOutlined, {}),
            children: t('privacy')
          }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
            block: true,
            type: getType("password"),
            onClick: () => handleSetActive("password"),
            icon: /*#__PURE__*/jsx_runtime_.jsx(icons_.KeyOutlined, {}),
            children: t('password')
          })]
        })
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "UserDetails",
        children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Card, {
          title: t(active),
          bordered: false,
          children: active && components[active]
        })
      })]
    })
  });
};

const profile_getServerSideProps = async ({
  query
}) => {
  const res = await (0,global/* fetchi18n */.oM)();
  return {
    props: {
      query,
      res
    }
  };
};
/* harmony default export */ var profile = (ProfileIndex);

/***/ }),

/***/ 2372:
/***/ (function(module) {

"use strict";
module.exports = require("@ant-design/icons");;

/***/ }),

/***/ 2953:
/***/ (function(module) {

"use strict";
module.exports = require("@fortawesome/free-brands-svg-icons");;

/***/ }),

/***/ 799:
/***/ (function(module) {

"use strict";
module.exports = require("@fortawesome/react-fontawesome");;

/***/ }),

/***/ 953:
/***/ (function(module) {

"use strict";
module.exports = require("antd");;

/***/ }),

/***/ 2666:
/***/ (function(module) {

"use strict";
module.exports = require("antd/lib/locale/en_US");;

/***/ }),

/***/ 7306:
/***/ (function(module) {

"use strict";
module.exports = require("antd/lib/locale/hi_IN");;

/***/ }),

/***/ 5980:
/***/ (function(module) {

"use strict";
module.exports = require("antd/lib/locale/tr_TR");;

/***/ }),

/***/ 2376:
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

/***/ }),

/***/ 2407:
/***/ (function(module) {

"use strict";
module.exports = require("dom-to-image");;

/***/ }),

/***/ 9421:
/***/ (function(module) {

"use strict";
module.exports = require("firebase/app");;

/***/ }),

/***/ 5942:
/***/ (function(module) {

"use strict";
module.exports = require("firebase/auth");;

/***/ }),

/***/ 8528:
/***/ (function(module) {

"use strict";
module.exports = require("i18next");;

/***/ }),

/***/ 3804:
/***/ (function(module) {

"use strict";
module.exports = require("lodash");;

/***/ }),

/***/ 2470:
/***/ (function(module) {

"use strict";
module.exports = require("moment");;

/***/ }),

/***/ 8353:
/***/ (function(module) {

"use strict";
module.exports = require("next-auth/react");;

/***/ }),

/***/ 5273:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/head.js");;

/***/ }),

/***/ 8417:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ 2238:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

/***/ }),

/***/ 5519:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/to-base-64.js");;

/***/ }),

/***/ 444:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/image-config.js");;

/***/ }),

/***/ 9639:
/***/ (function(module) {

"use strict";
module.exports = require("next/dynamic");;

/***/ }),

/***/ 6731:
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

/***/ }),

/***/ 6333:
/***/ (function(module) {

"use strict";
module.exports = require("pica");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 3283:
/***/ (function(module) {

"use strict";
module.exports = require("react-facebook-login/dist/facebook-login-render-props");;

/***/ }),

/***/ 7789:
/***/ (function(module) {

"use strict";
module.exports = require("react-i18next");;

/***/ }),

/***/ 5183:
/***/ (function(module) {

"use strict";
module.exports = require("react-phone-input-2");;

/***/ }),

/***/ 5038:
/***/ (function(module) {

"use strict";
module.exports = require("react-quill");;

/***/ }),

/***/ 79:
/***/ (function(module) {

"use strict";
module.exports = require("react-redux");;

/***/ }),

/***/ 2352:
/***/ (function(module) {

"use strict";
module.exports = require("react-share");;

/***/ }),

/***/ 8879:
/***/ (function(module) {

"use strict";
module.exports = require("react-show-more-text");;

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ }),

/***/ 7847:
/***/ (function(module) {

"use strict";
module.exports = require("recharts");;

/***/ }),

/***/ 8709:
/***/ (function(module) {

"use strict";
module.exports = require("recharts-to-png");;

/***/ }),

/***/ 7561:
/***/ (function(module) {

"use strict";
module.exports = require("redux");;

/***/ }),

/***/ 8492:
/***/ (function(module) {

"use strict";
module.exports = require("redux-logger");;

/***/ }),

/***/ 3643:
/***/ (function(module) {

"use strict";
module.exports = require("redux-persist");;

/***/ }),

/***/ 584:
/***/ (function(module) {

"use strict";
module.exports = require("redux-persist/lib/storage");;

/***/ }),

/***/ 5694:
/***/ (function(module) {

"use strict";
module.exports = require("redux-thunk");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [597,61,318,537,931,137], function() { return __webpack_exec__(9752); });
module.exports = __webpack_exports__;

})();