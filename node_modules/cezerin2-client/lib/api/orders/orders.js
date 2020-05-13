'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Orders = function () {
	function Orders(client) {
		_classCallCheck(this, Orders);

		this.client = client;
		this.resourceUrl = '/orders';
	}

	_createClass(Orders, [{
		key: 'list',
		value: function list(filter) {
			return this.client.get(this.resourceUrl, filter);
		}
	}, {
		key: 'retrieve',
		value: function retrieve(orderId, filter) {
			return this.client.get(this.resourceUrl + '/' + orderId, filter);
		}
	}, {
		key: 'create',
		value: function create(data) {
			return this.client.post(this.resourceUrl, data);
		}
	}, {
		key: 'update',
		value: function update(orderId, data) {
			return this.client.put(this.resourceUrl + '/' + orderId, data);
		}
	}, {
		key: 'delete',
		value: function _delete(orderId) {
			return this.client.delete(this.resourceUrl + '/' + orderId);
		}
	}, {
		key: 'recalculate',
		value: function recalculate(orderId) {
			return this.client.put(this.resourceUrl + '/' + orderId + '/recalculate');
		}
	}, {
		key: 'checkout',
		value: function checkout(orderId) {
			return this.client.put(this.resourceUrl + '/' + orderId + '/checkout');
		}
	}, {
		key: 'cancel',
		value: function cancel(orderId) {
			return this.client.put(this.resourceUrl + '/' + orderId + '/cancel');
		}
	}, {
		key: 'close',
		value: function close(orderId) {
			return this.client.put(this.resourceUrl + '/' + orderId + '/close');
		}
	}, {
		key: 'updateBillingAddress',
		value: function updateBillingAddress(orderId, address) {
			return this.client.put(this.resourceUrl + '/' + orderId + '/billing_address', address);
		}
	}, {
		key: 'updateShippingAddress',
		value: function updateShippingAddress(orderId, address) {
			return this.client.put(this.resourceUrl + '/' + orderId + '/shipping_address', address);
		}
	}, {
		key: 'getPaymentFormSettings',
		value: function getPaymentFormSettings(orderId) {
			return this.client.get(this.resourceUrl + '/' + orderId + '/payment_form_settings');
		}
	}]);

	return Orders;
}();

exports.default = Orders;