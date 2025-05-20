(function() {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 6107:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ pages; },
  "getServerSideProps": function() { return /* binding */ getServerSideProps; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./styles/Home.module.css
var Home_module = __webpack_require__(7644);
var Home_module_default = /*#__PURE__*/__webpack_require__.n(Home_module);
// EXTERNAL MODULE: ./layout/index.js + 6 modules
var layout = __webpack_require__(5137);
// EXTERNAL MODULE: ./components/index.js + 30 modules
var components = __webpack_require__(9226);
// EXTERNAL MODULE: ./store/requests/global.js
var global = __webpack_require__(8318);
// EXTERNAL MODULE: ./store/requests/auth.js
var auth = __webpack_require__(8407);
// EXTERNAL MODULE: ./plugins/index.js + 9 modules
var plugins = __webpack_require__(5537);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(953);
// EXTERNAL MODULE: ./config/index.js
var config = __webpack_require__(1130);
// EXTERNAL MODULE: ./helpers/index.js
var helpers = __webpack_require__(3005);
;// CONCATENATED MODULE: ./views/Home.js









const SurveyHome = () => {
  let url = `${config/* ApiUrl */.lp}home-survey-approval?country=${(0,helpers/* countryCode */.NI)()}`;

  function clearCookies() {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  }

  (0,external_react_.useEffect)(() => {
    // Call this function to clear cookies when needed
    clearCookies();
  });
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "Home",
    children: [/*#__PURE__*/jsx_runtime_.jsx(components/* SpecialSurvey */.PM, {}), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Divider, {
      style: {
        borderColor: "rgba(0,0,0,0.1)"
      }
    }), /*#__PURE__*/jsx_runtime_.jsx(components/* CategorySurvey */.zT, {
      url: url
    })]
  });
};

/* harmony default export */ var Home = (SurveyHome);
;// CONCATENATED MODULE: ./pages/index.js













const pages_Home = ({
  res
}) => {
  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(false);
  const {
    0: error,
    1: setError
  } = (0,external_react_.useState)(false);
  const {
    0: lanData,
    1: setLanData
  } = (0,external_react_.useState)();

  const onRefresh = () => {
    Promise.all([(0,auth/* getAccount */.D0)()]).then(res => {
      res && res.length > 0 ? setLanData(res[0]) : '';
      (0,global/* getData */.Yu)({
        url: `${config/* ApiUrl */.lp}subjects`,
        key: "subjects"
      });
      (0,global/* getData */.Yu)({
        url: `${config/* ApiUrl */.lp}surveys/newest`,
        key: "newest"
      });
      (0,global/* getData */.Yu)({
        url: `${config/* ApiUrl */.lp}surveys/topVoted`,
        key: "topVoted"
      });
      setLoading(String(true));
    }).catch(() => {
      setError(true);
    });
  };

  (0,external_react_.useEffect)(() => {
    (0,global/* seti18n */.mh)(res);
    Promise.all([(0,auth/* getAccount */.D0)()]).then(res => {
      res && res.length > 0 ? setLanData(res[0]) : '';
      (0,global/* getData */.Yu)({
        url: `${config/* ApiUrl */.lp}subjects`,
        key: "subjects"
      });
      (0,global/* getData */.Yu)({
        url: `${config/* ApiUrl */.lp}surveys/newest`,
        key: "newest"
      });
      (0,global/* getData */.Yu)({
        url: `${config/* ApiUrl */.lp}surveys/topVoted`,
        key: "topVoted"
      });
      setLoading(false);
    }).catch(() => {
      setError(true);
    });
  }, [res]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: (Home_module_default()).container,
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Optimal Rating"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "description",
        content: "Website Developed by Yaseen"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "icon",
        href: "/favicon.ico"
      }), /*#__PURE__*/jsx_runtime_.jsx("script", {
        src: "https://accounts.google.com/gsi/client",
        async: true,
        defer: true
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: (Home_module_default()).App,
      style: {
        height: '100%'
      },
      children: error ? /*#__PURE__*/jsx_runtime_.jsx(components/* Error */.jj, {
        onClick: onRefresh
      }) : loading ? /*#__PURE__*/jsx_runtime_.jsx(components/* Loading */.gb, {
        className: "Large"
      }) : lanData && lanData.result && lanData.result.set && /*#__PURE__*/jsx_runtime_.jsx(layout/* default */.Z, {
        children: /*#__PURE__*/jsx_runtime_.jsx(Home, {})
      })
    })]
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
/* harmony default export */ var pages = (pages_Home);

/***/ }),

/***/ 7644:
/***/ (function(module) {

// Exports
module.exports = {
	"container": "Home_container__1EcsU",
	"main": "Home_main__1x8gC",
	"footer": "Home_footer__1WdhD",
	"title": "Home_title__3DjR7",
	"description": "Home_description__17Z4F",
	"code": "Home_code__axx2Y",
	"grid": "Home_grid__2Ei2F",
	"card": "Home_card__2SdtB",
	"logo": "Home_logo__1YbrH"
};


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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [597,61,318,537,931,137], function() { return __webpack_exec__(6107); });
module.exports = __webpack_exports__;

})();