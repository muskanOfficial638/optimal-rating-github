(function() {
var exports = {};
exports.id = 929;
exports.ids = [929];
exports.modules = {

/***/ 384:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _id_; },
  "getServerSideProps": function() { return /* binding */ getServerSideProps; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: ./store/requests/global.js
var global = __webpack_require__(8318);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(953);
;// CONCATENATED MODULE: external "next-i18next"
var external_next_i18next_namespaceObject = require("next-i18next");;
// EXTERNAL MODULE: ./config/index.js
var config = __webpack_require__(1130);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: external "next-i18next/serverSideTranslations"
var serverSideTranslations_namespaceObject = require("next-i18next/serverSideTranslations");;
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(8353);
;// CONCATENATED MODULE: ./pages/[countryCode]/DeleteProfile/[id].js



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 // import { logout } from "../../../store/requests/auth";


 // import Layout from "../../../layout";





const DeleteProfile = ({
  history
}) => {
  const router = (0,router_.useRouter)();
  const {
    countryCode,
    id
  } = router.query;
  const {
    t
  } = (0,external_next_i18next_namespaceObject.useTranslation)("msg"); // Ensure this matches your namespace

  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(true);
  (0,external_react_.useEffect)(() => {
    if (!id) {
      return;
    }

    const authToken = localStorage.getItem("token");
    external_axios_default().get(`${config/* ApiUrl */.lp}approve-delete-profile/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then(response => {
      if (response.status === 200) {
        const token = localStorage.getItem("token");
        const session = localStorage.getItem("session");

        if (token && session) {
          (0,react_.signOut)({
            callbackUrl: '/'
          });
          localStorage.removeItem("session");
          localStorage.removeItem("account");
          localStorage.removeItem("token");
          localStorage.removeItem("registered"); // localStorage.clear();
        }

        external_antd_.notification.success({
          message: "Profile has been deleted."
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else if (response.status === 400) {
        external_antd_.notification.error({
          message: "Token not found."
        });
      } else {
        external_antd_.notification.error({
          message: t("msg.error_profile_delete")
        });
      }

      setLoading(false);
    }).catch(err => {
      console.log("Catch ERR=> ", err);
      external_antd_.notification.error({
        message: "Profile could not be deleted."
      });
    }).finally(() => {
      setLoading(false);
    });
  }, [id, t, router, history]);

  if (loading) {
    return /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: "Loading..."
    }); // Show loading state while waiting for API call
  }

  return /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Spin, {
    spinning: loading,
    style: {
      height: "100%"
    },
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "text-center pt-50",
      children: ["Hello! You are viewing the delete profile page with country code -", " ", countryCode, " ."]
    })
  });
};

const getServerSideProps = async ({
  locale,
  query
}) => {
  try {
    const res = await fetchi18n();
    const data = await (0,global/* getData */.Yu)({
      url: `${config/* ApiUrl */.lp}approve-delete-profile/${query.id}`
    });
    return {
      props: _objectSpread(_objectSpread({}, await (0,serverSideTranslations_namespaceObject.serverSideTranslations)(locale, ["msg"])), {}, {
        // Ensure your translation namespace is included here
        query,
        res,
        data
      })
    };
  } catch (error) {
    console.error("Server Error: ", error);
    return {
      props: {
        error: "Failed to fetch data"
      }
    };
  }
};
/* harmony default export */ var _id_ = (DeleteProfile);

/***/ }),

/***/ 953:
/***/ (function(module) {

"use strict";
module.exports = require("antd");;

/***/ }),

/***/ 2376:
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

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

/***/ 8353:
/***/ (function(module) {

"use strict";
module.exports = require("next-auth/react");;

/***/ }),

/***/ 6731:
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

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
var __webpack_exports__ = __webpack_require__.X(0, [318], function() { return __webpack_exec__(384); });
module.exports = __webpack_exports__;

})();