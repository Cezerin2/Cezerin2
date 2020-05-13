'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Theme = function () {
	function Theme(client) {
		_classCallCheck(this, Theme);

		this.client = client;
	}

	_createClass(Theme, [{
		key: 'export',
		value: function _export() {
			return this.client.get('/theme/export');
		}
	}, {
		key: 'install',
		value: function install(formData) {
			return this.client.postFormData('/theme/install', formData);
		}
	}]);

	return Theme;
}();

exports.default = Theme;