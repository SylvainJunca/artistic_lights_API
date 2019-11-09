/* jshint strict: true */
'use strict'; // init sourcemaps

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _sourceMapSupport = require("source-map-support");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _underscore = _interopRequireDefault(require("underscore"));

(0, _sourceMapSupport.install)(); //basic server dependencies

//express config
var app = (0, _express["default"])();
exports.app = app;
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); //logging with morgan

app.use((0, _morgan["default"])('combined', {
  skip: function skip(req, res) {
    return res.statusCode < 400;
  }
})); //security

app.use((0, _helmet["default"])());
app.disable('x-powered-by');
app.post('/light', function (req, res) {});
app.get('/light', function (req, res) {}); //404 middleware if nothing else matches

app.use(function (req, res) {
  return res.status(404).json({
    "error": {
      type: 404
    }
  });
});
var runPort = process.env.RUN_PORT || 8100; //start the server whether there's an error or not

app.listen(runPort);
console.log("Listening on port ".concat(runPort));
//# sourceMappingURL=server.js.map
