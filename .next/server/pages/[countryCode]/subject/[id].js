(function() {
var exports = {};
exports.id = 305;
exports.ids = [305];
exports.modules = {

/***/ 8199:
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
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(953);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3005);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2372);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3804);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5137);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1130);
/* harmony import */ var _store_requests_global__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8318);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9226);
/* harmony import */ var _components_SpecialSurvey_SurveyPieChart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5812);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7789);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7847);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(recharts__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var pica__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(6333);
/* harmony import */ var pica__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(pica__WEBPACK_IMPORTED_MODULE_15__);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


















const Subjects = ({
  match,
  res
}) => {
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_13__.useTranslation)();
  const {
    id: slug
  } = router.query;
  const {
    0: sort,
    1: setSort
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("vote");
  const {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const {
    0: pagination,
    1: setPagination
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    take: 5,
    page: 0,
    offset: 0
  });
  const {
    0: data,
    1: setData
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const {
    0: selected,
    1: setSelected
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const {
    0: voting,
    1: setVoting
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: resizedImageUrl,
    1: setResizedImageUrl
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(""); // console.log("API Request URL:", `${ApiUrl}subjectHasSurvey/${slug}`);
  // console.log(
  //   "Country Header:",
  //   countryCode() === "null" ? "world" : countryCode()
  // );

  const fetchSurveyData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async () => {
    try {
      const response = await axios__WEBPACK_IMPORTED_MODULE_10___default().get(`${_config__WEBPACK_IMPORTED_MODULE_16__/* .ApiUrl */ .lp}subjectHasSurvey/${slug}?orderBy=${sort}&take=${pagination.take}&page=${pagination.page}&offset=${pagination.offset}`, {
        headers: {
          country: (0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .countryCode */ .NI)() === "null" ? "world" : (0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .countryCode */ .NI)()
        }
      });
      console.log("Survey Data:", response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      var _error$response;

      console.error("Error fetching survey data:", (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.data);
    }
  }, [slug, sort, pagination]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_9__/* .seti18n */ .mh)(res);

    if (slug) {
      fetchSurveyData();
    }
  }, [res, slug, fetchSurveyData, sort, pagination]);
  const surveys = (0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .calculateSurvey */ .oU)((0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)(data, "result.set.surveys", []), true);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const resizeImage = async (chartImageName, surveyId) => {
      const image = new Image();
      image.src = `${_config__WEBPACK_IMPORTED_MODULE_16__/* .ImageStorage */ .cO}survey/${chartImageName}`;
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
          const picaInstance = pica__WEBPACK_IMPORTED_MODULE_15___default()();
          await picaInstance.resize(canvas, targetCanvas);
          targetCanvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            setResizedImageUrl(prevUrls => _objectSpread(_objectSpread({}, prevUrls), {}, {
              [surveyId]: url // Store the resized image URL for the specific survey

            }));
          }, "image/jpeg");
        } catch (error) {
          console.error("Image resizing error:", error);
        }
      };
    }; // Trigger the image resize for each survey when `data` changes


    surveys.forEach(survey => {
      const chartImageName = `${(0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .countryCode */ .NI)()}-${survey.id}.png`; // Dynamic chart image name

      if (!resizedImageUrl[survey.id]) {
        resizeImage(chartImageName, survey.id); // Resize only if not already resized
      }
    });
  }, [data, resizedImageUrl, surveys]);

  const Extra = () => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Dropdown, {
    overlay: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Menu, {
      onClick: ({
        key
      }) => setSort(key),
      style: {
        pointerEvents: "all"
      },
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Menu.Item, {
        children: "Latest"
      }, "date"), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Menu.Item, {
        children: "Highest Vote"
      }, "vote")]
    }),
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
      type: "link",
      icon: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_5__.SortAscendingOutlined, {})
    })
  });

  const chartRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();

  const onClick = item => {
    setSelected(item);
  };

  const submitVote = surveyId => {
    (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_9__/* .postData */ .qC)({
      url: `${_config__WEBPACK_IMPORTED_MODULE_16__/* .ApiUrl */ .lp}submitVote/${surveyId}`,
      data: {
        choice_id: selected && selected.id
      }
    }).then(response => {
      notification.success({
        message: t("msg.success_mark")
      });
      setVoting(false);
      setSelected(false);
      refresh();
    }).catch(err => {
      if (err.message === "msg.info.not_approved") {
        // not approved user
        antd__WEBPACK_IMPORTED_MODULE_2__.Modal.confirm({
          title: t("lbl.cancel_vote"),
          content: t("msg.must_approved"),
          onOk: () => router.push(`/${(0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .countryCode */ .NI)()}/profile`)
        });
      } else if (err.message === "msg.info.country_vote_notallowed") {
        notification.error({
          message: t("msg.error_country_vote_notallowed")
        });
      } else notification.error({
        message: t("msg.error_mark")
      });

      setVoting(false);
    });
  };

  const cancelVote = (surveyId, idList) => {
    setVoting(true);
    Promise.all(idList.map(x => (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_9__/* .getData */ .Yu)({
      url: `${_config__WEBPACK_IMPORTED_MODULE_16__/* .ApiUrl */ .lp}cancelVote/${surveyId}/${x}`
    }))).then(() => {
      submitVote(surveyId);
    }).catch(() => {
      setVoting(false);
    });
  };

  const onVote = survey => {
    setVoting(true); // Only work with the specific survey passed as an argument

    const surveyId = survey === null || survey === void 0 ? void 0 : survey.id; // Check if the user has already voted for this specific survey

    const promises = survey === null || survey === void 0 ? void 0 : survey.choices.map(x => (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_9__/* .getData */ .Yu)({
      url: `${_config__WEBPACK_IMPORTED_MODULE_16__/* .ApiUrl */ .lp}checkVote/${surveyId}/${x.id}`
    }).then(response => {
      return {
        surveyId: survey === null || survey === void 0 ? void 0 : survey.id,
        response
      };
    }).catch(() => {
      return {
        surveyId: survey === null || survey === void 0 ? void 0 : survey.id,
        response: null
      };
    }));
    Promise.all(promises).then(responses => {
      // Filter out null responses to identify if the user has already voted
      const alreadyVotedResponses = responses.filter(x => x.response);

      if (alreadyVotedResponses.length > 0) {
        setVoting(false);
        const surveyId = alreadyVotedResponses[0].surveyId;
        antd__WEBPACK_IMPORTED_MODULE_2__.Modal.confirm({
          title: t("lbl.cancel_vote"),
          content: t("lbl.survey_already_voted"),
          onOk: () => cancelVote(surveyId, alreadyVotedResponses.map(x => x.response.result.set.choice_id))
        });
      } else {
        // If no previous votes found for this survey, proceed to submit the vote
        submitVote(surveyId);
      }
    });
  };

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
  const {
    0: activeSurveyIndex,
    1: setActiveSurveyIndex
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);

  const handleOpenSurveyModal = index => {
    setActiveSurveyIndex(index);
  };

  const handleOk = () => {
    setActiveSurveyIndex(null);
  };

  const handleCancel = () => {
    setActiveSurveyIndex(null);
  };

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z, {
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Spin, {
      spinning: loading,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_11__/* .Empty */ .HY, {
        isEmpty: surveys.length === 0,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Card, {
          className: "SurveyDetail",
          title: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
            style: {
              fontSize: "20px",
              fontWeight: "600"
            },
            children: (0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)(data, "result.set.title")
          }),
          extra: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Extra, {}),
          bordered: false,
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "SurveyItems",
            children: (0,lodash__WEBPACK_IMPORTED_MODULE_6__.orderBy)(surveys, sort === "vote" ? "vote" : x => x.created_at, sort === "vote" ? "desc" : "asc").map((survey, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
              className: "SurveyItem",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "SurveyContent",
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                  className: "Label",
                  style: {
                    cursor: "pointer",
                    fontSize: "16px",
                    marginBottom: "15px"
                  },
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_4__.default, {
                    href: `/${(0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .countryCode */ .NI)()}/survey/special/${survey.id}/details`,
                    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                      children: survey.title
                    })
                  })
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_11__/* .LineChart */ .wW, {
                  data: (0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .calculateSurvey */ .oU)(survey && survey.choices, true),
                  selected: selected,
                  onClick: onClick,
                  isSpecial: true,
                  chartImageName: `${(0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .countryCode */ .NI)()}-${survey && survey.id}.png`,
                  url: `/${(0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .countryCode */ .NI)()}/special/${survey && survey.slug}`
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                  className: "mt-20 pl-10",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "d-flex",
                    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_11__/* .Permission */ .y3, {
                      showChild: true,
                      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        type: "primary",
                        disabled: !selected,
                        onClick: () => onVote(survey),
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
                    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(recharts__WEBPACK_IMPORTED_MODULE_14__.PieChart, {
                      style: {
                        cursor: "pointer",
                        marginRight: "2px"
                      },
                      width: 35,
                      height: 35,
                      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(recharts__WEBPACK_IMPORTED_MODULE_14__.Pie, {
                        data: pieData,
                        dataKey: "value",
                        nameKey: "name",
                        cx: "50%",
                        cy: "50%",
                        outerRadius: 15,
                        fill: "#8884d8",
                        label: true,
                        onClick: () => handleOpenSurveyModal(index),
                        children: pieData.map((entry, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(recharts__WEBPACK_IMPORTED_MODULE_14__.Cell, {
                          fill: ["#ff7300", "#ffbf00", "#0088fe", "#00c49f"][index]
                        }, `cell-${index}`))
                      })
                    }), activeSurveyIndex === index && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
                      title: t("msg.modal_title"),
                      open: activeSurveyIndex === index,
                      onOk: handleOk,
                      onCancel: handleCancel,
                      width: 700,
                      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_SpecialSurvey_SurveyPieChart__WEBPACK_IMPORTED_MODULE_12__/* .default */ .Z, {
                        data: (0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .calculateSurvey */ .oU)(survey && survey.choices, true),
                        ref: chartRef,
                        chartImageName: `${(0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .countryCode */ .NI)() || "default"}-${survey && survey.id}.png`
                      })
                    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_11__/* .Share */ .mB, {
                      title: survey && survey.title || "",
                      url: resizedImageUrl,
                      pageUrl: `${ false ? 0 : null}/${(0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .countryCode */ .NI)()}/special/${survey && survey.slug}`,
                      chartRef: ""
                    })]
                  }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, {})]
                })]
              })
            }, survey.id))
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Pagination, {
            style: {
              margin: "28px auto",
              textAlign: "center"
            },
            pageSize: pagination.take // Items per page
            ,
            current: pagination.page + 1 // Current page (1-based index)
            ,
            total: (0,_helpers__WEBPACK_IMPORTED_MODULE_3__/* .get */ .U2)(data, "result.pagination.recordCount") // Total number of items
            ,
            onChange: (page, pageSize) => {
              const offset = (page - 1) * pageSize; // Calculate offset

              setPagination(_objectSpread(_objectSpread({}, pagination), {}, {
                page: page - 1,
                // 0-based page index for backend
                offset,
                take: pageSize // Items per page

              }));
            }
          })]
        })
      })
    })
  });
};

const getServerSideProps = async () => {
  const res = await (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_9__/* .fetchi18n */ .oM)();
  return {
    props: {
      res
    }
  };
};
/* harmony default export */ __webpack_exports__["default"] = (Subjects);

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [597,61,318,537,931,137], function() { return __webpack_exec__(8199); });
module.exports = __webpack_exports__;

})();