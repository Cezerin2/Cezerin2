'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _crossFetch = require('cross-fetch');

var _crossFetch2 = _interopRequireDefault(_crossFetch);

var _restClient = require('./restClient');

var _restClient2 = _interopRequireDefault(_restClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApiClient = function (_RestClient) {
	_inherits(ApiClient, _RestClient);

	function ApiClient() {
		_classCallCheck(this, ApiClient);

		return _possibleConstructorReturn(this, (ApiClient.__proto__ || Object.getPrototypeOf(ApiClient)).apply(this, arguments));
	}

	return ApiClient;
}(_restClient2.default);

ApiClient.authorize = function (baseUrl, email) {
	var config = {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email: email })
	};
	return (0, _crossFetch2.default)(baseUrl + '/authorize', config).then(_restClient2.default.returnStatusAndJson);
};

exports.default = ApiClient;