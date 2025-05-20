(function() {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 3994:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _nextauth_; }
});

;// CONCATENATED MODULE: external "next-auth"
var external_next_auth_namespaceObject = require("next-auth");;
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/google"
var google_namespaceObject = require("next-auth/providers/google");;
var google_default = /*#__PURE__*/__webpack_require__.n(google_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/facebook"
var facebook_namespaceObject = require("next-auth/providers/facebook");;
var facebook_default = /*#__PURE__*/__webpack_require__.n(facebook_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/auth/[...nextauth].js



/* harmony default export */ var _nextauth_ = (external_next_auth_default()({
  providers: [google_default()({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture
      };
    }

  }), facebook_default()({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    authorization: {
      params: {
        scope: "email,public_profile"
      }
    },

    profile(profile) {
      var _profile$picture, _profile$picture$data;

      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: ((_profile$picture = profile.picture) === null || _profile$picture === void 0 ? void 0 : (_profile$picture$data = _profile$picture.data) === null || _profile$picture$data === void 0 ? void 0 : _profile$picture$data.url) || null
      };
    }

  })],
  session: {
    jwt: true
  },
  callbacks: {
    async jwt({
      token,
      account
    }) {
      // console.log("JWT callback - account:", account);
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }

      return token;
    },

    async session({
      session,
      token
    }) {
      // console.log("Session callback - token:", token);
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    }

  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL
}));

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(3994));
module.exports = __webpack_exports__;

})();