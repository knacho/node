"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _controllers = _interopRequireDefault(require("./controllers"));

var _config = _interopRequireDefault(require("./config"));

var _auth = _interopRequireDefault(require("./middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _config.default)();
const {
  PORT = 3000
} = process.env;
const app = (0, _express.default)();

const onServerCreated = () => {
  console.log('el servidor ha sido creado correctamente');
};

app.use(_bodyParser.default.json());
app.use(_auth.default);
(0, _controllers.default)(app);
app.listen(PORT, onServerCreated);