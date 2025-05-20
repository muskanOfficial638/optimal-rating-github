(function() {
var exports = {};
exports.id = 553;
exports.ids = [553];
exports.modules = {

/***/ 9951:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": function() { return /* binding */ getServerSideProps; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7789);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(953);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9226);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3005);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(867);
/* harmony import */ var _store_requests_global__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8318);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5137);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1130);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7847);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(recharts__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var pica__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6333);
/* harmony import */ var pica__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(pica__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_SpecialSurvey_SurveyPieChart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5812);

















const SpecialSurveyDetails = props => {
  const {
    0: voting,
    1: setVoting
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: selected,
    1: setSelected
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const {
    id
  } = router.query;
  const {
    data,
    loading,
    refresh
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_7__/* .useGet */ .XD)({
    url: `${_config__WEBPACK_IMPORTED_MODULE_13__/* .ApiUrl */ .lp}home-special-survey/${id}`,
    key: "specialSurvey"
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_8__/* .seti18n */ .mh)(props.res); // if (id) {
    //   setid(id);
    // }
    // return () => {
    //   setid(null);
    // };
  }, [props.match, props.res]);
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
  const chartRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();
  const choices = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .calculateSurvey */ .oU)((0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(data, "result.set.choices", []), true);
  const history = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const chartImageName = `${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .countryCode */ .NI)()}-${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(data, "result.set.id")}.png`;
  const {
    0: isModalOpen,
    1: setIsModalOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: resizedImageUrl,
    1: setResizedImageUrl
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const resizeImage = async () => {
      const image = new Image();
      image.src = `${_config__WEBPACK_IMPORTED_MODULE_13__/* .ImageStorage */ .cO}survey/${chartImageName}`;
      image.crossOrigin = "Anonymous";

      image.onload = async () => {
        const canvas = document.createElement("canvas");
        const targetCanvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        targetCanvas.width = 200; // Desired width

        targetCanvas.height = 200; // Desired height

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        try {
          const picaInstance = pica__WEBPACK_IMPORTED_MODULE_11___default()();
          await picaInstance.resize(canvas, targetCanvas);
          targetCanvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            setResizedImageUrl(url);
          }, "image/jpeg");
        } catch (error) {
          console.error("Image resizing error:", error);
        }
      };
    };

    resizeImage();
  }, [chartImageName]);
  const pieData = [{
    name: "A",
    value: 400
  }, {
    name: "B",
    value: 300
  }, {
    name: "C",
    value: 300
  }, {
    name: "D",
    value: 200
  }];

  const handleOpenSurveyModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClick = item => {
    setSelected(item);
  };

  const submitVote = () => {
    (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_8__/* .postData */ .qC)({
      url: `${_config__WEBPACK_IMPORTED_MODULE_13__/* .ApiUrl */ .lp}submitVote/${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(data, "result.set.id")}`,
      data: {
        choice_id: selected.id
      }
    }).then(response => {
      antd__WEBPACK_IMPORTED_MODULE_4__.notification.success({
        message: t("msg.success_mark")
      });
      setVoting(false);
      setSelected(false);
      refresh();
    }).catch(err => {
      if (err.message === "msg.info.not_approved") {
        // not approved user
        antd__WEBPACK_IMPORTED_MODULE_4__.Modal.confirm({
          title: t("lbl.cancel_vote"),
          content: t("msg.must_approved"),
          onOk: () => history.push(`/${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .countryCode */ .NI)()}/profile`)
        });
      } else if (err.message === "msg.info.country_vote_notallowed") {
        antd__WEBPACK_IMPORTED_MODULE_4__.notification.error({
          message: t("msg.error_unauthorized_country")
        });
      } else antd__WEBPACK_IMPORTED_MODULE_4__.notification.error({
        message: t("msg.error_mark")
      });

      setVoting(false);
    });
  };

  const cancelVote = idList => {
    setVoting(true);
    Promise.all(idList.map(x => (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_8__/* .getData */ .Yu)({
      url: `${_config__WEBPACK_IMPORTED_MODULE_13__/* .ApiUrl */ .lp}cancelVote/${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(data, "result.set.id")}/${x}`
    }))).then(() => {
      submitVote();
    }).catch(() => {
      setVoting(false);
    });
  };

  const onVote = () => {
    setVoting(true);
    const promises = choices.map(x => (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_8__/* .getData */ .Yu)({
      url: `${_config__WEBPACK_IMPORTED_MODULE_13__/* .ApiUrl */ .lp}checkVote/${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(data, "result.set.id")}/${x.id}`
    }).then(response => {
      return response;
    }).catch(() => {
      return null;
    }));
    Promise.all(promises).then(responses => {
      const response = responses.filter(x => x);

      if (response.length > 0) {
        setVoting(false);
        antd__WEBPACK_IMPORTED_MODULE_4__.Modal.confirm({
          title: t("lbl.cancel_vote"),
          content: t("lbl.survey_already_voted"),
          onOk: () => cancelVote(response.map(x => x.result.set.choice_id))
        });
      } else {
        submitVote();
      }
    });
  };

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout__WEBPACK_IMPORTED_MODULE_9__/* .default */ .Z, {
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Spin, {
      spinning: loading,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Card, {
        title: (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(data, "result.set.title"),
        bordered: false,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_5__/* .Empty */ .HY, {
          isEmpty: !(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(data, "result.set"),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_5__/* .LineChart */ .wW, {
              data: choices,
              selected: selected,
              onClick: onClick,
              isSpecial: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "mt-20 pl-10",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "d-flex",
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_5__/* .Permission */ .y3, {
                  showChild: true,
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Button, {
                    type: "primary",
                    disabled: !selected,
                    onClick: onVote,
                    loading: voting,
                    children: t("lbl.vote")
                  })
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                  className: "ml-auto",
                  style: {
                    color: "#3a99ab",
                    marginRight: "5px",
                    marginTop: "4px"
                  },
                  children: t("msg.display")
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(recharts__WEBPACK_IMPORTED_MODULE_10__.PieChart, {
                  style: {
                    cursor: "pointer",
                    marginRight: "2px"
                  },
                  width: 35,
                  height: 35,
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(recharts__WEBPACK_IMPORTED_MODULE_10__.Pie, {
                    data: pieData,
                    dataKey: "value",
                    nameKey: "name",
                    cx: "50%",
                    cy: "50%",
                    outerRadius: 15,
                    fill: "#8884d8",
                    label: true,
                    onClick: handleOpenSurveyModal,
                    children: pieData.map((entry, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(recharts__WEBPACK_IMPORTED_MODULE_10__.Cell, {
                      fill: ["#ff7300", "#ffbf00", "#0088fe", "#00c49f"][index]
                    }, `cell-${index}`))
                  })
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Modal, {
                  title: t("msg.modal_title"),
                  open: isModalOpen,
                  onOk: handleOk,
                  onCancel: handleCancel,
                  width: 700,
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_SpecialSurvey_SurveyPieChart__WEBPACK_IMPORTED_MODULE_12__/* .default */ .Z, {
                    data: choices,
                    ref: chartRef,
                    chartImageName: chartImageName
                  })
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_5__/* .Share */ .mB // className="ml-auto"
                , {
                  title: (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(data, "result.set.title") || "",
                  url: resizedImageUrl,
                  pageUrl: `${ false ? 0 : null}/${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .countryCode */ .NI)()}/special/${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(data, "result.set.slug") || ""}`,
                  chartRef: ""
                })]
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Divider, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_5__/* .Comments */ .HW, {
                data: (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(data, "result.set.comments", []),
                surveyId: (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(data, "result.set.id")
              })]
            })]
          })
        })
      })
    })
  });
};

const getServerSideProps = async ({
  query
}) => {
  const res = await (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_8__/* .fetchi18n */ .oM)();
  return {
    props: {
      query,
      res
    }
  };
};
/* harmony default export */ __webpack_exports__["default"] = (SpecialSurveyDetails);

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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [597,61,318,537,931,137], function() { return __webpack_exec__(9951); });
module.exports = __webpack_exports__;

})();