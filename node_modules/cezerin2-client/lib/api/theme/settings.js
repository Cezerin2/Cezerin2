'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThemeSettings = function () {
	function ThemeSettings(client) {
		_classCallCheck(this, ThemeSettings);

		this.client = client;
	}

	_createClass(ThemeSettings, [{
		key: 'retrieve',
		value: function retrieve() {
			return this.client.get('/theme/settings');
		}
	}, {
		key: 'update',
		value: function update(data) {
			return this.client.put('/theme/settings', data);
		}
	}, {
		key: 'retrieveSchema',
		value: function retrieveSchema() {
			return this.client.get('/theme/settings_schema');
		}
	}]);

	return ThemeSettings;
}();

exports.default = ThemeSettings;