"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductVariants = function () {
	function ProductVariants(client) {
		_classCallCheck(this, ProductVariants);

		this.client = client;
	}

	_createClass(ProductVariants, [{
		key: "list",
		value: function list(productId) {
			return this.client.get("/products/" + productId + "/variants");
		}
	}, {
		key: "create",
		value: function create(productId, data) {
			return this.client.post("/products/" + productId + "/variants", data);
		}
	}, {
		key: "update",
		value: function update(productId, variantId, data) {
			return this.client.put("/products/" + productId + "/variants/" + variantId, data);
		}
	}, {
		key: "delete",
		value: function _delete(productId, variantId) {
			return this.client.delete("/products/" + productId + "/variants/" + variantId);
		}
	}, {
		key: "setOption",
		value: function setOption(productId, variantId, data) {
			return this.client.put("/products/" + productId + "/variants/" + variantId + "/options", data);
		}
	}]);

	return ProductVariants;
}();

exports.default = ProductVariants;