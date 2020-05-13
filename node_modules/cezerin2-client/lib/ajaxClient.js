'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _restClient = require('./restClient');

var _restClient2 = _interopRequireDefault(_restClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AjaxClient = function (_RestClient) {
	_inherits(AjaxClient, _RestClient);

	function AjaxClient() {
		_classCallCheck(this, AjaxClient);

		return _possibleConstructorReturn(this, (AjaxClient.__proto__ || Object.getPrototypeOf(AjaxClient)).apply(this, arguments));
	}

	_createClass(AjaxClient, [{
		key: 'getConfig',
		value: function getConfig(method, data, cookie) {
			var config = {
				credentials: this.getCredentialsConfig(this.baseUrl),
				method: method,
				headers: {
					'Content-Type': 'application/json'
				}
			};

			if (cookie) {
				config.headers.Cookie = cookie;
			}

			if (data) {
				config.body = JSON.stringify(data);
			}
			return config;
		}
	}, {
		key: 'getCredentialsConfig',
		value: function getCredentialsConfig(baseUrl) {
			var includePrefix = baseUrl.includes('http://') || baseUrl.includes('https://');
			return includePrefix ? 'include' : 'same-origin';
		}
	}]);

	return AjaxClient;
}(_restClient2.default);

exports.default = AjaxClient;