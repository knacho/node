"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Beer = _interopRequireDefault(require("./Beer"));

var _User = _interopRequireDefault(require("./User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = app => {
  (0, _Beer.default)(app);
  (0, _User.default)(app);
};

exports.default = _default;