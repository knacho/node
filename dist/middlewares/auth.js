"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerPath = exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config");

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (req, res, next) => {
  const {
    authorization
  } = req.headers;

  try {
    const decode = _jsonwebtoken.default.verify(authorization, _config.SECRET);

    const onUserFound = user => {
      if (user) {
        req.user = user;
      }

      next();
    };

    _user.default.findOne({
      _id: decode.id
    }).then(onUserFound).catch(() => next());
  } catch (e) {
    next();
  }
};

exports.default = _default;

const registerPath = () => {};

exports.registerPath = registerPath;