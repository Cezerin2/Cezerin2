"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductOptionValues = function () {
	function ProductOptionValues(client) {
		_classCallCheck(this, ProductOptionValues);

		this.client = client;
	}

	_createClass(ProductOptionValues, [{
		key: "list",
		value: function list(productId, optionId) {
			return this.client.get("/products/" + productId + "/options/" + optionId + "/values");
		}
	}, {
		key: "retrieve",
		value: function retrieve(productId, optionId, valueId) {
			return this.client.get("/products/" + productId + "/options/" + optionId + "/values/" + valueId);
		}
	}, {
		key: "create",
		value: function create(productId, optionId, data) {
			return this.client.post("/products/" + productId + "/options/" + optionId + "/values", data);
		}
	}, {
		key: "update",
		value: function update(productId, optionId, valueId, data) {
			return this.client.put("/products/" + productId + "/options/" + optionId + "/values/" + valueId, data);
		}
	}, {
		key: "delete",
		value: function _delete(productId, optionId, valueId) {
			return this.client.delete("/products/" + productId + "/options/" + optionId + "/values/" + valueId);
		}
	}]);

	return ProductOptionValues;
}();

exports.default = ProductOptionValues;