'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductCategories = function () {
	function ProductCategories(client) {
		_classCallCheck(this, ProductCategories);

		this.client = client;
		this.resourceUrl = '/product_categories';
	}

	_createClass(ProductCategories, [{
		key: 'list',
		value: function list(filter) {
			return this.client.get(this.resourceUrl, filter);
		}
	}, {
		key: 'retrieve',
		value: function retrieve(id) {
			return this.client.get(this.resourceUrl + '/' + id);
		}
	}, {
		key: 'create',
		value: function create(data) {
			return this.client.post(this.resourceUrl, data);
		}
	}, {
		key: 'update',
		value: function update(id, data) {
			return this.client.put(this.resourceUrl + '/' + id, data);
		}
	}, {
		key: 'delete',
		value: function _delete(id) {
			return this.client.delete(this.resourceUrl + '/' + id);
		}
	}, {
		key: 'uploadImage',
		value: function uploadImage(categoryId, formData) {
			return this.client.postFormData(this.resourceUrl + '/' + categoryId + '/image', formData);
		}
	}, {
		key: 'deleteImage',
		value: function deleteImage(id) {
			return this.client.delete(this.resourceUrl + '/' + id + '/image');
		}
	}]);

	return ProductCategories;
}();

exports.default = ProductCategories;