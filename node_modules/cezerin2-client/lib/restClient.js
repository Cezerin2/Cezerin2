'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crossFetch = require('cross-fetch');

var _crossFetch2 = _interopRequireDefault(_crossFetch);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RestClient = function () {
	function RestClient(_ref) {
		var _this = this;

		var baseUrl = _ref.baseUrl,
		    token = _ref.token;

		_classCallCheck(this, RestClient);

		this.postFormDataConfig = function (formData) {
			return {
				method: 'post',
				body: formData,
				headers: {
					Authorization: 'Bearer ' + _this.token
				}
			};
		};

		this.returnStatusAndJson = function (response) {
			return response.json().then(function (json) {
				return { status: response.status, json: json };
			}).catch(function () {
				return { status: response.status, json: null };
			});
		};

		this.baseUrl = baseUrl;
		this.token = token;
	}

	_createClass(RestClient, [{
		key: 'getConfig',
		value: function getConfig(method, data) {
			var config = {
				method: method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + this.token
				}
			};

			if (data) {
				config.body = JSON.stringify(data);
			}
			return config;
		}
	}, {
		key: 'get',
		value: function get(endpoint, filter, cookie) {
			return (0, _crossFetch2.default)('' + this.baseUrl + endpoint + '?' + _queryString2.default.stringify(filter), this.getConfig('get', null, cookie)).then(this.returnStatusAndJson);
		}
	}, {
		key: 'post',
		value: function post(endpoint, data) {
			return (0, _crossFetch2.default)(this.baseUrl + endpoint, this.getConfig('post', data)).then(this.returnStatusAndJson);
		}
	}, {
		key: 'postFormData',
		value: function postFormData(endpoint, formData) {
			return (0, _crossFetch2.default)(this.baseUrl + endpoint, this.postFormDataConfig(formData)).then(this.returnStatusAndJson);
		}
	}, {
		key: 'put',
		value: function put(endpoint, data) {
			return (0, _crossFetch2.default)(this.baseUrl + endpoint, this.getConfig('put', data)).then(this.returnStatusAndJson);
		}
	}, {
		key: 'delete',
		value: function _delete(endpoint) {
			return (0, _crossFetch2.default)(this.baseUrl + endpoint, this.getConfig('delete')).then(this.returnStatusAndJson);
		}
	}]);

	return RestClient;
}();

RestClient.returnStatusAndJsonStatic = function (response) {
	return response.json().then(function (json) {
		return { status: response.status, json: json };
	}).catch(function () {
		return { status: response.status, json: null };
	});
};

exports.default = RestClient;