'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebStoreAccount = function () {
	function WebStoreAccount(client) {
		_classCallCheck(this, WebStoreAccount);

		this.client = client;
		this.resourceUrl = '/account';
	}

	_createClass(WebStoreAccount, [{
		key: 'retrieve',
		value: function retrieve() {
			return this.client.get(this.resourceUrl);
		}
	}, {
		key: 'update',
		value: function update(data) {
			return this.client.put(this.resourceUrl, data);
		}
	}, {
		key: 'updateDeveloper',
		value: function updateDeveloper(data) {
			return this.client.put(this.resourceUrl + '/developer', data);
		}
	}]);

	return WebStoreAccount;
}();

exports.default = WebStoreAccount;