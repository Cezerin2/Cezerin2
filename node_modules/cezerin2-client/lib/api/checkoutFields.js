'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheckoutFields = function () {
	function CheckoutFields(client) {
		_classCallCheck(this, CheckoutFields);

		this.client = client;
		this.resourceUrl = '/settings/checkout/fields';
	}

	_createClass(CheckoutFields, [{
		key: 'list',
		value: function list() {
			return this.client.get(this.resourceUrl);
		}
	}, {
		key: 'retrieve',
		value: function retrieve(name) {
			return this.client.get(this.resourceUrl + '/' + name);
		}
	}, {
		key: 'update',
		value: function update(name, data) {
			return this.client.put(this.resourceUrl + '/' + name, data);
		}
	}]);

	return CheckoutFields;
}();

exports.default = CheckoutFields;