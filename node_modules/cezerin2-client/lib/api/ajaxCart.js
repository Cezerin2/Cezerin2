"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AjaxCart = function () {
	function AjaxCart(client) {
		_classCallCheck(this, AjaxCart);

		this.client = client;
	}

	_createClass(AjaxCart, [{
		key: "retrieve",
		value: function retrieve(cookie) {
			return this.client.get("/cart", null, cookie);
		}
	}, {
		key: "update",
		value: function update(data) {
			return this.client.put("/cart", data);
		}
	}, {
		key: "checkout",
		value: function checkout() {
			return this.client.put("/cart/checkout");
		}
	}, {
		key: "updateBillingAddress",
		value: function updateBillingAddress(address) {
			return this.client.put("/cart/billing_address", address);
		}
	}, {
		key: "updateShippingAddress",
		value: function updateShippingAddress(address) {
			return this.client.put("/cart/shipping_address", address);
		}
	}, {
		key: "addItem",
		value: function addItem(data) {
			return this.client.post("/cart/items", data);
		}
	}, {
		key: "updateItem",
		value: function updateItem(id, data) {
			return this.client.put("/cart/items/" + id, data);
		}
	}, {
		key: "deleteItem",
		value: function deleteItem(id) {
			return this.client.delete("/cart/items/" + id);
		}
	}]);

	return AjaxCart;
}();

exports.default = AjaxCart;