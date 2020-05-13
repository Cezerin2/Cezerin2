"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AjaxForgotPassword = function () {
	function AjaxForgotPassword(client) {
		_classCallCheck(this, AjaxForgotPassword);

		this.client = client;
	}

	_createClass(AjaxForgotPassword, [{
		key: "retrieve",
		value: function retrieve(data) {
			return this.client.post("/forgot-password", data);
		}
	}, {
		key: "update",
		value: function update(data) {
			return this.client.put("/forgot-password", data);
		}
	}]);

	return AjaxForgotPassword;
}();

exports.default = AjaxForgotPassword;