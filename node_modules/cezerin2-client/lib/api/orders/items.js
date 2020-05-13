"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderItems = function () {
	function OrderItems(client) {
		_classCallCheck(this, OrderItems);

		this.client = client;
	}

	_createClass(OrderItems, [{
		key: "create",
		value: function create(orderId, data) {
			return this.client.post("/orders/" + orderId + "/items", data);
		}
	}, {
		key: "update",
		value: function update(orderId, itemId, data) {
			return this.client.put("/orders/" + orderId + "/items/" + itemId, data);
		}
	}, {
		key: "delete",
		value: function _delete(orderId, itemId) {
			return this.client.delete("/orders/" + orderId + "/items/" + itemId);
		}
	}]);

	return OrderItems;
}();

exports.default = OrderItems;