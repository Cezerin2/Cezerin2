"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const redux_form_1 = require("redux-form");
const redux_form_material_ui_1 = require("redux-form-material-ui");
const editor_1 = __importDefault(require("modules/shared/editor"));
const form_1 = require("modules/shared/form");
const imageUpload_1 = __importDefault(require("modules/shared/imageUpload"));
const text_1 = __importDefault(require("lib/text"));
const api_1 = __importDefault(require("lib/api"));
const Paper_1 = __importDefault(require("material-ui/Paper"));
const FlatButton_1 = __importDefault(require("material-ui/FlatButton"));
const RaisedButton_1 = __importDefault(require("material-ui/RaisedButton"));
const style_css_1 = __importDefault(require("./style.css"));
const validate = values => {
    const errors = {};
    const requiredFields = ["name"];
    requiredFields.forEach(field => {
        if (values && !values[field]) {
            errors[field] = text_1.default.errors_required;
        }
    });
    return errors;
};
const asyncValidate = values => new Promise((resolve, reject) => {
    if (values.slug && values.slug.length > 0) {
        api_1.default.sitemap
            .retrieve({ path: `/${values.slug}` })
            .then(({ status, json }) => {
            if (status === 404) {
                resolve();
            }
            else if (json && !Object.is(json.resource, values.id)) {
                reject({ slug: text_1.default.errors_urlTaken });
            }
            else {
                resolve();
            }
        });
    }
    else {
        resolve();
    }
});
const ProductCategoryEditForm = ({ uploadingImage, handleSubmit, pristine, reset, submitting, onImageUpload, onImageDelete, isSaving, initialValues }) => {
    let imageUrl = null;
    let categoryId = null;
    if (initialValues) {
        categoryId = initialValues.id;
        imageUrl = initialValues.image;
    }
    if (categoryId) {
        return (react_1.default.createElement(Paper_1.default, { className: "paper-box", zDepth: 1 },
            react_1.default.createElement("form", { onSubmit: handleSubmit },
                react_1.default.createElement("div", { className: style_css_1.default.innerBox },
                    react_1.default.createElement(redux_form_1.Field, { name: "name", component: redux_form_material_ui_1.TextField, floatingLabelText: `${text_1.default.productCategories_name} *`, fullWidth: true }),
                    react_1.default.createElement("div", { className: "field-hint", style: { marginTop: 40 } }, text_1.default.description),
                    react_1.default.createElement(redux_form_1.Field, { name: "description", entityId: categoryId, component: editor_1.default }),
                    react_1.default.createElement("div", { className: style_css_1.default.shortBox },
                        react_1.default.createElement(redux_form_1.Field, { name: "enabled", component: form_1.CustomToggle, label: text_1.default.enabled, className: style_css_1.default.toggle }),
                        react_1.default.createElement(imageUpload_1.default, { uploading: uploadingImage, imageUrl: imageUrl, onDelete: onImageDelete, onUpload: onImageUpload })),
                    react_1.default.createElement("div", { className: "blue-title" }, text_1.default.seo),
                    react_1.default.createElement(redux_form_1.Field, { name: "slug", component: redux_form_material_ui_1.TextField, floatingLabelText: text_1.default.slug, fullWidth: true }),
                    react_1.default.createElement("p", { className: "field-hint" }, text_1.default.help_slug),
                    react_1.default.createElement(redux_form_1.Field, { name: "meta_title", component: redux_form_material_ui_1.TextField, floatingLabelText: text_1.default.pageTitle, fullWidth: true }),
                    react_1.default.createElement(redux_form_1.Field, { name: "meta_description", component: redux_form_material_ui_1.TextField, floatingLabelText: text_1.default.metaDescription, fullWidth: true })),
                react_1.default.createElement("div", { className: `buttons-box ${pristine ? "buttons-box-pristine" : "buttons-box-show"}` },
                    react_1.default.createElement(FlatButton_1.default, { label: text_1.default.cancel, className: style_css_1.default.button, onClick: reset, disabled: pristine || submitting }),
                    react_1.default.createElement(RaisedButton_1.default, { type: "submit", label: text_1.default.save, primary: true, className: style_css_1.default.button, disabled: pristine || submitting || isSaving })))));
    }
    return null;
};
exports.default = redux_form_1.reduxForm({
    form: "ProductCategoryEditForm",
    validate,
    asyncValidate,
    asyncBlurFields: ["slug"],
    enableReinitialize: true
})(ProductCategoryEditForm);
//# sourceMappingURL=form.js.map