"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valUserType = exports.default = void 0;

var _default = res => ({
  message
}) => {
  res.status(500).json({
    message
  });
};

exports.default = _default;

const valUserType = (user, typeNeeded) => {
  if (!user) {
    return false;
  }

  if (typeof typeNeeded === 'string') {
    return user.type === typeNeeded;
  }

  if (typeof typeNeeded === 'array') {
    return typeNeeded.indexOf(user.type) >= 0;
  }

  throw new Error('Bad typeNeeded');
};

exports.valUserType = valUserType;