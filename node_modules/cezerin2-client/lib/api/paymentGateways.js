'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaymentGateways = function () {
	function PaymentGateways(client) {
		_classCallCheck(this, PaymentGateways);

		this.client = client;
		this.resourceUrl = '/payment_gateways';
	}

	_createClass(PaymentGateways, [{
		key: 'retrieve',
		value: function retrieve(gatewayName) {
			return this.client.get(this.resourceUrl + '/' + gatewayName);
		}
	}, {
		key: 'update',
		value: function update(gatewayName, data) {
			return this.client.put(this.resourceUrl + '/' + gatewayName, data);
		}
	}]);

	return PaymentGateways;
}();

exports.default = PaymentGateways;