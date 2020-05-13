"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductOptions = function () {
	function ProductOptions(client) {
		_classCallCheck(this, ProductOptions);

		this.client = client;
	}

	_createClass(ProductOptions, [{
		key: "list",
		value: function list(productId) {
			return this.client.get("/products/" + productId + "/options");
		}
	}, {
		key: "retrieve",
		value: function retrieve(productId, optionId) {
			return this.client.get("/products/" + productId + "/options/" + optionId);
		}
	}, {
		key: "create",
		value: function create(productId, data) {
			return this.client.post("/products/" + productId + "/options", data);
		}
	}, {
		key: "update",
		value: function update(productId, optionId, data) {
			return this.client.put("/products/" + productId + "/options/" + optionId, data);
		}
	}, {
		key: "delete",
		value: function _delete(productId, optionId) {
			return this.client.delete("/products/" + productId + "/options/" + optionId);
		}
	}]);

	return ProductOptions;
}();

exports.default = ProductOptions;