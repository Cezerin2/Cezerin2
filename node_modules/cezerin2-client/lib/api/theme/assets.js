'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThemeAssets = function () {
	function ThemeAssets(client) {
		_classCallCheck(this, ThemeAssets);

		this.client = client;
		this.resourceUrl = '/theme/assets';
	}

	_createClass(ThemeAssets, [{
		key: 'uploadFile',
		value: function uploadFile(formData) {
			return this.client.postFormData(this.resourceUrl, formData);
		}
	}, {
		key: 'deleteFile',
		value: function deleteFile(fileName) {
			return this.client.delete(this.resourceUrl + '/' + fileName);
		}
	}]);

	return ThemeAssets;
}();

exports.default = ThemeAssets;