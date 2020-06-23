"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const form_1 = __importDefault(require("./components/form"));
const mapStateToProps = state => ({
    uploadingImage: state.productCategories.uploadingImage,
    categoryId: state.productCategories.selectedId,
    items: state.productCategories.items,
    initialValues: state.productCategories.items.find(item => item.id === state.productCategories.selectedId),
    isSaving: state.productCategories.isSaving
});
const mapDispatchToProps = dispatch => ({
    onImageDelete: () => {
        dispatch(actions_1.deleteImage());
    },
    onImageUpload: form => {
        dispatch(actions_1.uploadImage(form));
    },
    onSubmit: values => {
        delete values.image;
        if (!values.slug || values.slug === "") {
            values.slug = values.name;
        }
        dispatch(actions_1.updateCategory(values));
    }
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(form_1.default);
//# sourceMappingURL=index.js.map