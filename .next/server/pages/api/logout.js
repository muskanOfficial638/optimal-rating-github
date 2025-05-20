(function() {
var exports = {};
exports.id = 30;
exports.ids = [30];
exports.modules = {

/***/ 5180:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ handler; }
/* harmony export */ });
// pages/api/logout.js
function handler(req, res) {
  res.setHeader('Set-Cookie', ['next-auth.callback-url=; Path=/; Max-Age=0', 'next-auth.csrf-token=; Path=/; Max-Age=0' // Clear other cookies if needed
  ]);
  res.status(200).json({
    message: 'Logged out'
  });
}

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(5180));
module.exports = __webpack_exports__;

})();