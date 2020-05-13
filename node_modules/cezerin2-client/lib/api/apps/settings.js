'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppSettings = function () {
	function AppSettings(client) {
		_classCallCheck(this, AppSettings);

		this.client = client;
		this.resourceUrl = '/apps';
	}

	_createClass(AppSettings, [{
		key: 'retrieve',
		value: function retrieve(appKey) {
			return this.client.get(this.resourceUrl + '/' + appKey + '/settings');
		}
	}, {
		key: 'update',
		value: function update(appKey, data) {
			return this.client.put(this.resourceUrl + '/' + appKey + '/settings', data);
		}
	}]);

	return AppSettings;
}();

exports.default = AppSettings;