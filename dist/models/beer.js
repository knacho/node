"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const beerSchema = new _mongoose.default.Schema({
  id: String,
  name: String,
  nameDisplay: String,
  abv: String,
  isOrganic: String,
  isRetired: String,
  status: String,
  statusDisplay: String
});

var _default = _mongoose.default.model('Beer', beerSchema);

exports.default = _default;