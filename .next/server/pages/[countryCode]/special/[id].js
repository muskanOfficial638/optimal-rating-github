(function() {
var exports = {};
exports.id = 747;
exports.ids = [747];
exports.modules = {

/***/ 6264:
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
/* harmony import */ var _proxies__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3098);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1664);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5137);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1130);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(701);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(7847);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(recharts__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _components_SpecialSurvey_SurveyPieChart__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5812);















 // import { result } from "lodash";




const SpecialSurveyDetails = ({
  query,
  res,
  resLan
}) => {
  // const router = useRouter();
  const {
    0: voting,
    1: setVoting
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: selected,
    1: setSelected
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_8__/* .seti18n */ .mh)(resLan);
    _proxies__WEBPACK_IMPORTED_MODULE_9__/* .DashboardProxy.setHeader */ .$.setHeader("country", (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .countryCode */ .NI)());
  }, [resLan]);
  const {
    data,
    loading,
    refresh
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_7__/* .useGet */ .XD)({
    url: `${_config__WEBPACK_IMPORTED_MODULE_15__/* .ApiUrl */ .lp}home-special-survey`,
    key: "specialSurvey"
  });
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)(); // const choices = calculateSurvey(get(data, "result.set.choices", []), true);

  const history = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)(); // const onClick = (item) => {
  //   setSelected(item);
  // };
  // const submitVote = () => {
  //   postData({
  //     url: `${ApiUrl}submitVote/${get(
  //       data,
  //       "result.set.id"
  //     )}`,
  //     data: { choice_id: selected.id },
  //   })
  //     .then((response) => {
  //       notification.success({ message: t("msg.success_mark") });
  //       setVoting(false);
  //       setSelected(false);
  //       refresh();
  //     })
  //     .catch((err) => {
  //       if (err.message === "msg.info.not_approved") {
  //         // not approved user
  //         Modal.confirm({
  //           title: t("lbl.cancel_vote"),
  //           content: t("msg.must_approved"),
  //           onOk: () => history.push(`/${countryCode()}/profile`),
  //         });
  //       } else if (err.message === "msg.info.country_vote_notallowed") {
  //         notification.error({
  //           message: t("msg.error_unauthorized_country"),
  //         });
  //       } else notification.error({ message: t("msg.error_mark") });
  //       setVoting(false);
  //     });
  // };
  // const cancelVote = (idList) => {
  //   setVoting(true);
  //   Promise.all(
  //     idList.map((x) =>
  //       getData({
  //         url: `${ApiUrl}cancelVote/${get(
  //           data,
  //           "result.set.id"
  //         )}/${x}`,
  //       })
  //     )
  //   )
  //     .then(() => {
  //       submitVote();
  //     })
  //     .catch(() => {
  //       setVoting(false);
  //     });
  // };
  // const onVote = () => {
  //   setVoting(true);
  //   const promises = choices.map((x) =>
  //     getData({
  //       url: `${ApiUrl}checkVote/${get(
  //         data,
  //         "result.set.id"
  //       )}/${x.id}`,
  //     })
  //       .then((response) => {
  //         return response;
  //       })
  //       .catch(() => {
  //         return null;
  //       })
  //   );
  //   Promise.all(promises).then((responses) => {
  //     const response = responses.filter((x) => x);
  //     if (response.length > 0) {
  //       setVoting(false);
  //       Modal.confirm({
  //         title: t("lbl.cancel_vote"),
  //         content: t("lbl.survey_already_voted"),
  //         onOk: () => cancelVote(response.map((x) => x.result.set.choice_id)),
  //       });
  //     } else {
  //       submitVote();
  //     }
  //   });
  // };
  // const Title = () => (
  //   <Link href={`/${countryCode()}/special/${get(data, "result.set.slug")}`}>
  //     <a>{get(data, "result.set.title")}</a>
  //   </Link>
  // );

  const onClick = item => {
    setSelected(item);
  };

  const submitVote = surveyId => {
    (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_8__/* .postData */ .qC)({
      url: `${_config__WEBPACK_IMPORTED_MODULE_15__/* .ApiUrl */ .lp}submitVote/${surveyId}`,
      data: {
        choice_id: selected === null || selected === void 0 ? void 0 : selected.id
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
          message: t("msg.error_country_vote_notallowed")
        });
      } else antd__WEBPACK_IMPORTED_MODULE_4__.notification.error({
        message: t("msg.error_mark")
      });

      setVoting(false);
    });
  };

  const cancelVote = (surveyId, idList) => {
    setVoting(true);
    Promise.all(idList.map(x => (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_8__/* .getData */ .Yu)({
      url: `${_config__WEBPACK_IMPORTED_MODULE_15__/* .ApiUrl */ .lp}cancelVote/${surveyId}/${x}`
    }))).then(() => {
      submitVote(surveyId);
    }).catch(() => {
      setVoting(false);
    });
  };

  const onVote = survey => {
    setVoting(true); // Only work with the specific survey passed as an argument

    const surveyId = survey === null || survey === void 0 ? void 0 : survey.id; // Check if the user has already voted for this specific survey

    const promises = survey === null || survey === void 0 ? void 0 : survey.choices.map(x => (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_8__/* .getData */ .Yu)({
      url: `${_config__WEBPACK_IMPORTED_MODULE_15__/* .ApiUrl */ .lp}checkVote/${surveyId}/${x.id}`
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
        antd__WEBPACK_IMPORTED_MODULE_4__.Modal.confirm({
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

  const Title = ({
    survey
  }) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_10__.default, {
    href: `/${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .countryCode */ .NI)()}/special/${survey.slug}`,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
      children: survey.title
    })
  });

  const details = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(res, "result.set");
  const choiceData = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .calculateSurvey */ .oU)(details.choices, true); // const imgUrl = `${ImageStorage}survey/${query.countryCode}-${details.id}.png`;
  // const detailsUrl = `${typeof window !== "undefined"? window.location.origin:''}/${query.countryCode}/special/${details.slug}`;
  // const chartImageName = `${query.countryCode}-${details.id}.png`;

  const chartRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();
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
    0: isModalOpen,
    1: setIsModalOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Spin, {
    spinning: loading,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_layout__WEBPACK_IMPORTED_MODULE_11__/* .default */ .Z, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_12___default()), {
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
          charSet: "utf-8"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
          children: details.title
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Card, {
        title: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Title, {
          survey: details
        }),
        bordered: false,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_5__/* .Empty */ .HY, {
          isEmpty: !details,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_5__/* .LineChart */ .wW, {
              data: choiceData,
              selected: selected,
              onClick: onClick,
              isSpecial: true,
              chartImageName: `${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .countryCode */ .NI)()}-${details && details.id}.png`,
              url: `/${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .countryCode */ .NI)()}/special/${details && details.slug}`
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              className: "mt-20 pl-10",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "d-flex",
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_5__/* .Permission */ .y3, {
                  showChild: true,
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Button, {
                    type: "primary",
                    disabled: !selected,
                    onClick: () => onVote(details),
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
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(recharts__WEBPACK_IMPORTED_MODULE_13__.PieChart, {
                  style: {
                    cursor: "pointer",
                    marginRight: "2px"
                  },
                  width: 35,
                  height: 35,
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(recharts__WEBPACK_IMPORTED_MODULE_13__.Pie, {
                    data: pieData,
                    dataKey: "value",
                    nameKey: "name",
                    cx: "50%",
                    cy: "50%",
                    outerRadius: 15,
                    fill: "#8884d8",
                    label: true,
                    onClick: showModal,
                    children: pieData.map((entry, index) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(recharts__WEBPACK_IMPORTED_MODULE_13__.Cell, {
                      fill: ["#ff7300", "#ffbf00", "#0088fe", "#00c49f"][index]
                    }, `cell-${index}`))
                  })
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Modal, {
                  title: t("msg.modal_title"),
                  open: isModalOpen,
                  onOk: handleOk,
                  onCancel: handleCancel,
                  width: 700,
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_SpecialSurvey_SurveyPieChart__WEBPACK_IMPORTED_MODULE_14__/* .default */ .Z, {
                    data: choiceData,
                    ref: chartRef,
                    chartImageName: `${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .countryCode */ .NI)()}-${details && details.id}.png`
                  })
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_5__/* .Share */ .mB, {
                  title: details && details.title || "",
                  url: `${_config__WEBPACK_IMPORTED_MODULE_15__/* .ImageStorage */ .cO}survey/
                        ${`${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .countryCode */ .NI)()}-${details && details.id}.png`}`,
                  pageUrl: `${ false ? 0 : null}/${(0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .countryCode */ .NI)()}/special/${details && details.slug || ""}`,
                  chartRef: ""
                })]
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Divider, {}), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_5__/* .Comments */ .HW, {
                data: (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(details, "comments", []) // Fetch comments from the survey
                ,
                surveyId: details && details.id // Use the survey ID for the comments

              })]
            })]
          })
        })
      }, details && details.id)]
    })
  }) //   <Spin spinning={loading}>
  //   <Layout>
  //    <Head>
  //        <meta charSet="utf-8" />
  //        <title>{details.title}</title>
  //      </Head>
  //    <Card title={<Title/>} bordered={false} > c
  //      <Empty isEmpty={!get(data, "result.set")} >
  //        <div>
  //          <LineChart
  //            data={choices}
  //            selected={selected}
  //            onClick={onClick}
  //            isSpecial
  //            chartImageName={chartImageName}
  //          />
  //          <div className="mt-20 pl-10">
  //            <div className="d-flex">
  //              <Permission showChild>
  //                <Button
  //                  type="primary"
  //                  disabled={!selected}
  //                  onClick={onVote}
  //                  loading={voting}
  //                >
  //                  {t("lbl.vote")}
  //                </Button>
  //              </Permission>
  //              <Share
  //                    className="ml-auto"
  //                    title={details && details.title || ''}
  //                    url={
  //                      `${ImageStorage}survey/
  //                      ${chartImageName}`
  //                    }
  //                    pageUrl={`${
  //                      typeof window !== "undefined"
  //                        ? window.location.origin
  //                        : null
  //                    }/${countryCode()}/special/${details &&  details.slug || ''}`}
  //                    chartRef={''}
  //                  />
  //             </div>
  //            <Divider />
  //            <Comments
  //              data={get(data, "result.set.comments", [])}
  //              surveyId={get(data, "result.set.id")}
  //            />
  //          </div>
  //        </div>
  //      </Empty>
  //    </Card>
  //    </Layout>
  //  </Spin>
  ;
};

const getServerSideProps = async ({
  query
}) => {
  const res = await (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_8__/* .getData */ .Yu)({
    url: `${_config__WEBPACK_IMPORTED_MODULE_15__/* .ApiUrl */ .lp}surveys/detail/${query.id}`
  });
  const resLan = await (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_8__/* .fetchi18n */ .oM)();
  const details = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(res, "result.set", {});
  const imgUrl = `${_config__WEBPACK_IMPORTED_MODULE_15__/* .ImageStorage */ .cO}survey/${query.countryCode}-${details.id}.png`;
  const detailsUrl = `${query.countryCode}/survey/${details.slug}`;
  const metaTags = {
    "og:title": details.title || "Survey",
    "og:description": details.description || "Overview of above survey",
    "og:image": imgUrl,
    "og:url": detailsUrl
  };
  return {
    props: {
      query,
      res,
      resLan,
      metaTags
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

/***/ 701:
/***/ (function(module) {

"use strict";
module.exports = require("next/head");;

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
var __webpack_exports__ = __webpack_require__.X(0, [597,61,318,537,931,137], function() { return __webpack_exec__(6264); });
module.exports = __webpack_exports__;

})();