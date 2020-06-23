"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const redux_form_1 = require("redux-form");
const redux_form_material_ui_1 = require("redux-form-material-ui");
const form_1 = require("modules/shared/form");
const editor_1 = __importDefault(require("modules/shared/editor"));
const react_tagsinput_1 = __importDefault(require("react-tagsinput"));
const text_1 = __importDefault(require("lib/text"));
const api_1 = __importDefault(require("lib/api"));
const Paper_1 = __importDefault(require("material-ui/Paper"));
const RaisedButton_1 = __importDefault(require("material-ui/RaisedButton"));
const style_css_1 = __importDefault(require("./style.css"));
const TagsField = ({ input, placeholder }) => {
    const tagsArray = input.value && Array.isArray(input.value) ? input.value : [];
    return (react_1.default.createElement(react_tagsinput_1.default, { value: tagsArray, inputProps: { placeholder }, onChange: tags => {
            input.onChange(tags);
        } }));
};
const validate = values => {
    const errors = {};
    const requiredFields = ["slug", "meta_title"];
    requiredFields.map(field => {
        if (!values.is_system && values && !values[field]) {
            errors[field] = text_1.default.errors_required;
        }
    });
    return errors;
};
const asyncValidate = (values) => new Promise((resolve, reject) => {
    if (!values.slug && values.is_system) {
        resolve();
    }
    else {
        api_1.default.sitemap.retrieve({ path: values.slug }).then(({ status, json }) => {
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
});
class EditPageForm extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.onLoad();
    }
    componentWillUnmount() {
        this.props.eraseData();
    }
    render() {
        const { handleSubmit, pristine, submitting, initialValues, pageId } = this.props;
        const isAdd = pageId === null || pageId === undefined;
        if (initialValues) {
            return (react_1.default.createElement("form", { onSubmit: handleSubmit },
                react_1.default.createElement(Paper_1.default, { className: "paper-box", zDepth: 1 },
                    react_1.default.createElement("div", { className: style_css_1.default.innerBox },
                        react_1.default.createElement(redux_form_1.Field, { name: "meta_title", component: redux_form_material_ui_1.TextField, floatingLabelText: text_1.default.pageTitle, fullWidth: true }),
                        react_1.default.createElement("br", null),
                        react_1.default.createElement(redux_form_1.Field, { name: "slug", component: redux_form_material_ui_1.TextField, floatingLabelText: text_1.default.slug, fullWidth: true, disabled: initialValues.is_system }),
                        react_1.default.createElement("p", { className: "field-hint" }, text_1.default.help_slug),
                        react_1.default.createElement(redux_form_1.Field, { name: "meta_description", component: redux_form_material_ui_1.TextField, floatingLabelText: text_1.default.metaDescription, fullWidth: true }),
                        react_1.default.createElement("div", { className: "field-hint", style: { marginTop: 40 } }, text_1.default.content),
                        react_1.default.createElement("div", { style: { marginBottom: 50 } },
                            react_1.default.createElement(redux_form_1.Field, { name: "content", component: editor_1.default })),
                        text_1.default.tags,
                        react_1.default.createElement(redux_form_1.Field, { name: "tags", component: TagsField, placeholder: text_1.default.newTag }),
                        react_1.default.createElement("div", { style: { maxWidth: 256 } },
                            react_1.default.createElement(redux_form_1.Field, { component: form_1.CustomToggle, name: "enabled", label: text_1.default.enabled, style: { paddingTop: 16, paddingBottom: 16 }, disabled: initialValues.is_system }))),
                    react_1.default.createElement("div", { className: `buttons-box ${pristine && !isAdd ? "buttons-box-pristine" : "buttons-box-show"}` },
                        react_1.default.createElement(RaisedButton_1.default, { type: "submit", label: isAdd ? text_1.default.add : text_1.default.save, primary: true, className: style_css_1.default.button, disabled: pristine || submitting })))));
        }
        return null;
    }
}
exports.default = redux_form_1.reduxForm({
    form: "EditPageForm",
    validate,
    asyncValidate,
    asyncBlurFields: ["slug"],
    enableReinitialize: true
})(EditPageForm);
//# sourceMappingURL=form.js.map