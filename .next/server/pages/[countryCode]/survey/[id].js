(function() {
var exports = {};
exports.id = 588;
exports.ids = [588];
exports.modules = {

/***/ 9164:
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
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9226);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(867);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5137);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(953);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3005);
/* harmony import */ var _store_requests_global__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8318);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1130);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(701);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);


// pages/[countryCode]/survey/[id].js












const Summary = ({
  query,
  res,
  resLan
}) => {
  const {
    id
  } = query;
  const {
    0: url,
    1: setUrl
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(`?`);
  const {
    0: data,
    1: setData
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const {
    0: loading,
    1: setLoading
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const {
    0: error,
    1: setError
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null); // const { data, loading, refresh } = useGet({
  //   url: `${ApiUrl}surveys/detail/${id}${url}`
  // });
  // Memoize the fetchSurveyDetail function with useCallback

  const fetchSurveyDetail = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async () => {
    setLoading(true);

    try {
      const response = await axios__WEBPACK_IMPORTED_MODULE_9___default().get(`${_config__WEBPACK_IMPORTED_MODULE_10__/* .ApiUrl */ .lp}surveys/detail/${id}${url}`);
      setData(response.data);
    } catch (err) {
      setError(err);
      console.error("Error fetching survey detail:", err);
    } finally {
      setLoading(false);
    }
  }, [id, url]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetchSurveyDetail();
  }, [fetchSurveyDetail]);
  const details = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(res, "result.set", {});
  const imgUrl = `${_config__WEBPACK_IMPORTED_MODULE_10__/* .ImageStorage */ .cO}survey/${query.countryCode}-${details.id}.png`;
  const detailsUrl = `${ false ? 0 : ""}/${query.countryCode}/survey/${details.slug}`;

  const refresh = () => {
    fetchSurveyDetail();
  };

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_7__/* .seti18n */ .mh)(resLan);
  }, [resLan]);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_5__.Spin, {
    spinning: loading,
    style: {
      height: "100%"
    },
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "Survey",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_8___default()), {
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
            children: details.title
          })
        }), data && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_2__/* .CategorySurvey */ .zT, {
          survey: data,
          onRefresh: refresh,
          hasData: true
        })]
      })
    })
  });
};

const getServerSideProps = async ({
  query
}) => {
  const res = await (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_7__/* .getData */ .Yu)({
    url: `${_config__WEBPACK_IMPORTED_MODULE_10__/* .ApiUrl */ .lp}surveys/detail/${query.id}`
  });
  const resLan = await (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_7__/* .fetchi18n */ .oM)();
  const details = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__/* .get */ .U2)(res, "result.set", {});
  const imgUrl = `${_config__WEBPACK_IMPORTED_MODULE_10__/* .ImageStorage */ .cO}survey/${query.countryCode}-${details.id}.png`;
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
/* harmony default export */ __webpack_exports__["default"] = (Summary);

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
var __webpack_exports__ = __webpack_require__.X(0, [597,61,318,537,931,137], function() { return __webpack_exec__(9164); });
module.exports = __webpack_exports__;

})();