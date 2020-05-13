"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebStoreServices = function () {
	function WebStoreServices(client) {
		_classCallCheck(this, WebStoreServices);

		this.client = client;
	}

	_createClass(WebStoreServices, [{
		key: "retrieve",
		value: function retrieve(id) {
			return this.client.get("/services/" + id + "/settings");
		}
	}, {
		key: "update",
		value: function update(id, data) {
			return this.client.post("/services/" + id + "/settings", data);
		}
	}]);

	return WebStoreServices;
}();

exports.default = WebStoreServices;