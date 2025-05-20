(function() {
var exports = {};
exports.id = 86;
exports.ids = [86];
exports.modules = {

/***/ 1510:
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
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(953);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9226);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3005);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7789);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_i18next__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1664);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2372);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5137);
/* harmony import */ var _plugins__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(5537);
/* harmony import */ var _store_requests_global__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8318);




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














const CategorySurveys = ({
  match,
  history,
  res,
  session
}) => {
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_6__.useTranslation)();
  const {
    data,
    loading
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.global.tree);
  const {
    id
  } = router.query;

  const findItem = () => {
    const list = [];
    (0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)(data, "result.set", []).forEach(x => {
      list.push(_objectSpread(_objectSpread({}, x), {}, {
        name: t(x.code)
      }), ...x.children.map(y => _objectSpread(_objectSpread({}, y), {}, {
        parentName: t(x.code)
      })));
    });
    return list.find(x => x.slug === id);
  };

  const item = findItem();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_12__/* .seti18n */ .mh)(res);
  }, [res]);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
    className: "Category",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_layout__WEBPACK_IMPORTED_MODULE_10__/* .default */ .Z, {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Spin, {
        spinning: loading,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_4__/* .Empty */ .HY, {
          isEmpty: !item,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
            className: "text-bold text-xxl",
            children: [(0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .exists */ .Gg)(item, "parentName") && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_7__.default, {
                href: `/${(0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .countryCode */ .NI)()}/category/${(0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)(item, "parent")}`,
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                  children: (0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)(item, "parentName")
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_8__.DoubleRightOutlined, {
                className: "ml-5 mr-5 text-md"
              })]
            }), (0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)(item, "name")]
          }), (0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .exists */ .Gg)(item, "surveys") ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_4__/* .Empty */ .HY, {
            isEmpty: (0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)(item, "surveys", []).length === 0,
            description: t("lbl.no_survey"),
            emptyChild: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_4__/* .Permission */ .y3, {
              showChild: true,
              type: "agreement",
              callback: () => router.push(`/${(0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .countryCode */ .NI)()}/survey`, undefined, {
                shallow: true
              }),
              session: session,
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Button, {
                type: "primary",
                icon: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_8__.PlusOutlined, {}),
                children: t("lbl.add_new_survey")
              })
            }),
            children: (0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)(item, "surveys", []).map(x => x.status === "1" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_4__/* .CategorySurvey */ .zT // url={`/${countryCode()}/survey/${x.slug}`}
              , {
                url: `/surveys/detail/${x.slug}` //edited by Muskan
                ,
                short: true
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Divider, {
                style: {
                  borderColor: "rgba(0,0,0,0.1)"
                }
              })]
            }, x.id) : null)
          }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_4__/* .Empty */ .HY, {
            isEmpty: (0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)(item, "children", []).length === 0,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Card, {
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Collapse, {
                children: (0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .get */ .U2)(item, "children", []).map(x => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Collapse.Panel, {
                  header:
                  /*#__PURE__*/

                  /*<Link href={`/${countryCode()}/category/${x.slug}`}>
                    <a>{x.name}{x.slug}</a>
                  </Link>*/
                  react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    children: x.name
                  }, x.id),
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components__WEBPACK_IMPORTED_MODULE_4__/* .Empty */ .HY, {
                    isEmpty: !x.surveys || x.surveys.length === 0,
                    description: t("lbl.no_survey"),
                    children: x.surveys && x.surveys.length > 0 && x.surveys.filter(y => y.status === "1") //edited by Muskan
                    //  .slice(0, 2)
                    .map(y => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_7__.default, {
                        href: `/${(0,_helpers__WEBPACK_IMPORTED_MODULE_5__/* .countryCode */ .NI)()}/survey/${y.slug}`,
                        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                          children: y.title
                        })
                      })
                    }, y.id))
                  })
                }, x.id))
              })
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
  const res = await (0,_store_requests_global__WEBPACK_IMPORTED_MODULE_12__/* .fetchi18n */ .oM)();
  return {
    props: {
      query,
      res
    }
  };
};
/* harmony default export */ __webpack_exports__["default"] = (CategorySurveys);

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
var __webpack_exports__ = __webpack_require__.X(0, [597,61,318,537,931,137], function() { return __webpack_exec__(1510); });
module.exports = __webpack_exports__;

})();