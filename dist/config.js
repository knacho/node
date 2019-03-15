"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dbConnect;
exports.SALTINESS = exports.SECRET = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dbConnect() {
  _mongoose.default.connect('mongodb+srv://rakirox:1234567890@prueba-99adx.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
  });
}

const SECRET = 'asjkljksajkaskjlsalkaslksa';
exports.SECRET = SECRET;
const SALTINESS = 8;
exports.SALTINESS = SALTINESS;