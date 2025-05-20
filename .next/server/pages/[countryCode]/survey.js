(function() {
var exports = {};
exports.id = 154;
exports.ids = [154];
exports.modules = {

/***/ 6349:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ survey; },
  "getServerSideProps": function() { return /* binding */ getServerSideProps; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "react-i18next"
var external_react_i18next_ = __webpack_require__(7789);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(953);
// EXTERNAL MODULE: ./components/formElements/index.js + 7 modules
var formElements = __webpack_require__(8801);
// EXTERNAL MODULE: ./components/index.js + 30 modules
var components = __webpack_require__(9226);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(2372);
// EXTERNAL MODULE: external "next/dynamic"
var dynamic_ = __webpack_require__(9639);
var dynamic_default = /*#__PURE__*/__webpack_require__.n(dynamic_);
;// CONCATENATED MODULE: ./views/Survey/Create/Choices.js



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const ReactQuill = dynamic_default()(() => Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 5038, 23)), {
  ssr: false,
  loadableGenerated: {
    webpack: () => [/*require.resolve*/(5038)],
    modules: ["../views/Survey/Create/Choices.js -> " + "react-quill"]
  }
});

function ChoiceImage({
  fields = [],
  add,
  remove,
  t,
  initial = 3,
  form
}) {
  const {
    0: descriptionLength,
    1: setDescriptionLength
  } = (0,external_react_.useState)(0); // console.log("changes 12");
  // console.log("Form Values:", form.getFieldsValue());

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "SurveyChoices",
      children: fields && fields.map((field, index) => /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "SurveyChoice",
        style: {
          padding: "20px"
        },
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "ChoiceImage",
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
            name: [field.name, "id"],
            fieldKey: [field.fieldKey, "id"],
            initialValue: null,
            className: "d-none",
            children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {})
          }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
            label: " ",
            name: [field.name, "choice_image"],
            fieldKey: [field.fieldKey, "choice_image"],
            rules: [{
              required: true,
              message: t("msg.candidate_image_required")
            }],
            children: /*#__PURE__*/jsx_runtime_.jsx(components/* Upload */.gq, {})
          }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
            name: [field.name, "marking"],
            fieldKey: [field.fieldKey, "marking"],
            rules: [{
              validator: async (_, marking) => {
                if (!marking || marking === 0) {
                  return Promise.reject(new Error(t("msg.rating_required")));
                }
              }
            }],
            children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Rate, {})
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "ChoiceInfo",
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
            className: "mb-20",
            label: t("lbl.name"),
            name: [field.name, "choice_title"],
            fieldKey: [field.fieldKey, "choice_title"],
            rules: [{
              required: true,
              message: t("msg.required_title")
            }],
            children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {})
          }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
            label: t("lbl.description"),
            name: [field.name, "choice_description"],
            fieldKey: [field.fieldKey, "choice_description"],
            rules: [{
              required: true,
              message: t("msg.required_description")
            }, {
              validator: async (_, choice_description) => {
                if ((choice_description === null || choice_description === void 0 ? void 0 : choice_description.replace(/(<([^>]+)>)/gi, "").length) > 1000) {
                  return Promise.reject(new Error(t("msg.error_exceed_max_character")));
                }
              }
            }],
            children: /*#__PURE__*/jsx_runtime_.jsx(ReactQuill, {
              value: form.getFieldValue(["choices", field.name, "choice_description"]) || "",
              onChange: (content, delta, source, editor) => {
                // console.log("Quill Content:", content);
                // Ensure ReactQuill gets HTML, not Delta
                const htmlContent = content || ""; // Quill outputs HTML

                const currentChoices = form.getFieldValue("choices") || []; // Ensure the field is always an object, not undefined

                const updatedChoices = currentChoices.map((choice, idx) => idx === field.name ? _objectSpread(_objectSpread({}, choice), {}, {
                  choice_description: htmlContent,
                  // ✅ Use HTML instead of Delta
                  choice_description_length: editor.getLength() - 1
                }) : choice !== null && choice !== void 0 ? choice : {} // If choice is undefined, replace it with an empty object
                );
                form.setFieldsValue({
                  choices: updatedChoices // ✅ Set updated choices ensuring no undefined fields

                });
                setDescriptionLength(editor.getLength() - 1);
              }
            })
          })]
        }), index > initial && /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
          icon: /*#__PURE__*/jsx_runtime_.jsx(icons_.DeleteOutlined, {}),
          onClick: () => remove(field.name) //style={{margin: 'auto'}}

        })]
      }, field.key))
    }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Divider, {}), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "text-center",
      children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
        icon: /*#__PURE__*/jsx_runtime_.jsx(icons_.PlusOutlined, {}) // onClick={() => add()}
        ,
        onClick: () => {
          const currentChoices = form.getFieldValue("choices") || [];
          form.setFieldsValue({
            choices: [...currentChoices, {
              id: null,
              choice_image: "",
              marking: null,
              choice_title: "",
              choice_description: ""
            }] // ✅ Ensure new choice is not undefined

          });
        },
        children: t("lbl.new_choice")
      })
    })]
  });
}
// EXTERNAL MODULE: ./store/requests/global.js
var global = __webpack_require__(8318);
// EXTERNAL MODULE: ./helpers/fileUpload.js
var helpers_fileUpload = __webpack_require__(5688);
// EXTERNAL MODULE: ./layout/index.js + 6 modules
var layout = __webpack_require__(5137);
// EXTERNAL MODULE: ./config/index.js
var config = __webpack_require__(1130);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: external "i18next"
var external_i18next_ = __webpack_require__(8528);
var external_i18next_default = /*#__PURE__*/__webpack_require__.n(external_i18next_);
;// CONCATENATED MODULE: ./pages/[countryCode]/survey.js



function survey_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function survey_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { survey_ownKeys(Object(source), true).forEach(function (key) { survey_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { survey_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function survey_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















const Choice = props => {
  const {
    t
  } = (0,external_react_i18next_.useTranslation)();
  const [form] = external_antd_.Form.useForm();
  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(false);
  const {
    0: newCategory,
    1: setNewCategory
  } = (0,external_react_.useState)(null);
  const history = (0,router_.useRouter)();
  (0,external_react_.useEffect)(() => {
    (0,global/* seti18n */.mh)(props.res);
    form.setFieldsValue({
      choices: [{
        id: null,
        choice_image: "",
        marking: null,
        choice_title: "",
        choice_description: ""
      }, {
        id: null,
        choice_image: "",
        marking: null,
        choice_title: "",
        choice_description: ""
      }, {
        id: null,
        choice_image: "",
        marking: null,
        choice_title: "",
        choice_description: ""
      }]
    });
  }, [form, props.res, t]);
  const {
    asPath
  } = history; // Extract the country code from the URL path (assuming it's always in the second segment)

  const segments = asPath.split("/");
  const countryCode = segments[1]; // "tr" in this case
  // console.log("countryCode",countryCode);

  (0,external_react_.useEffect)(() => {
    if (props.res) {
      // console.log('Setting translation data:', props.res);
      external_i18next_default().addResourceBundle(countryCode, "translation", props.res, true, true);
      external_i18next_default().changeLanguage(countryCode); // console.log('Translated text new:', i18n.t('lbl.add_survey'));
    }
  }, [props.res, countryCode]);

  const onSubmit = async values => {
    setLoading(true);

    for (let index = 0; index < values.choices.length; index++) {
      const choice = values.choices[index];
      values.choices[index].choice_image = await (0,helpers_fileUpload/* default */.Z)(choice.choice_image, "sa");
    }

    var country =  false ? 0 : null;
    values.country_code = country;

    if (country === "null") {
      values.is_world = true;
    }

    (0,global/* postData */.qC)({
      url: `${config/* ApiUrl */.lp}surveys`,
      data: survey_objectSpread(survey_objectSpread({}, values), {}, {
        type: "normal"
      })
    }).then(response => {
      setLoading(false);

      if (Number(response === null || response === void 0 ? void 0 : response.code) == 200) {
        external_antd_.notification.success({
          message: t("msg.success_survey_add")
        });
        history.push("/");
      }
    }).catch(err => {
      if (err.message === "msg.error_not_allowed_country") {
        external_antd_.notification.error({
          message: t("msg.error_unauthorized_country")
        });
      } else {
        external_antd_.notification.error({
          message: t("msg.error_survey_add")
        });
      }

      setLoading(false);
    });
  };

  return /*#__PURE__*/jsx_runtime_.jsx(layout/* default */.Z, {
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "Survey",
      children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Card, {
        title: t("lbl.add_survey"),
        bordered: false,
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Form, {
          form: form,
          layout: "vertical",
          onFinish: onSubmit,
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
            className: "mb-20",
            name: "category_id",
            label: t("lbl.select_category"),
            style: {
              maxWidth: 600
            },
            rules: [{
              required: true,
              message: t("msg.required_category")
            }],
            children: /*#__PURE__*/jsx_runtime_.jsx(formElements/* CategorySelect */.yW, {
              newCategory: newCategory
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(components/* NewCategory */.cz, {
            setNewCategory: setNewCategory
          }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
            name: "title",
            label: t("survey_title"),
            rules: [{
              required: true,
              message: t("msg.required_title")
            }],
            style: {
              maxWidth: 600
            },
            children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Input, {})
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Divider, {
            children: [" ", t("lbl.choices"), " "]
          }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.List, {
            name: "choices",
            children: (fields, {
              add,
              remove
            }) => /*#__PURE__*/jsx_runtime_.jsx(ChoiceImage, survey_objectSpread(survey_objectSpread({}, {
              fields,
              add,
              remove,
              t,
              initial: 3
            }), {}, {
              form: form
            }))
          }), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form.Item, {
            children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
              type: "primary",
              htmlType: "submit",
              loading: loading,
              children: t("save")
            })
          })]
        })
      })
    })
  });
};

const getServerSideProps = async ({
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
/* harmony default export */ var survey = (Choice);

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
var __webpack_exports__ = __webpack_require__.X(0, [597,61,318,537,931,137], function() { return __webpack_exec__(6349); });
module.exports = __webpack_exports__;

})();