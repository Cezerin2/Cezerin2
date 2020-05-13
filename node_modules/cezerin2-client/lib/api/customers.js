'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Customers = function () {
	function Customers(client) {
		_classCallCheck(this, Customers);

		this.client = client;
		this.resourceUrl = '/customers';
	}

	_createClass(Customers, [{
		key: 'list',
		value: function list(filter) {
			return this.client.get(this.resourceUrl, filter);
		}
	}, {
		key: 'retrieve',
		value: function retrieve(id, filter) {
			return this.client.get(this.resourceUrl + '/' + id, filter);
		}
	}, {
		key: 'create',
		value: function create(data) {
			return this.client.post(this.resourceUrl, data);
		}
	}, {
		key: 'update',
		value: function update(id, data) {
			return this.client.put(this.resourceUrl + '/' + id, data);
		}
	}, {
		key: 'delete',
		value: function _delete(id) {
			return this.client.delete(this.resourceUrl + '/' + id);
		}
	}, {
		key: 'createAddress',
		value: function createAddress(customerId, data) {
			return this.client.post(this.resourceUrl + '/' + customerId, data);
		}
	}, {
		key: 'updateAddress',
		value: function updateAddress(customerId, addressId, data) {
			return this.client.put(this.resourceUrl + '/' + customerId + '/addresses/' + addressId, data);
		}
	}, {
		key: 'deleteAddress',
		value: function deleteAddress(customerId, addressId) {
			return this.client.delete(this.resourceUrl + '/' + customerId + '/addresses/' + addressId);
		}
	}, {
		key: 'setDefaultBillingAddress',
		value: function setDefaultBillingAddress(customerId, addressId) {
			return this.client.post(this.resourceUrl + '/' + customerId + '/addresses/' + addressId + '/default_billing');
		}
	}, {
		key: 'setDefaultShippingAddress',
		value: function setDefaultShippingAddress(customerId, addressId) {
			return this.client.post(this.resourceUrl + '/' + customerId + '/addresses/' + addressId + '/default_shipping');
		}
	}]);

	return Customers;
}();

exports.default = Customers;