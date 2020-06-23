"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const form_1 = __importDefault(require("./components/form"));
const mapStateToProps = (state, ownProps) => {
    const { pageId } = ownProps.match.params;
    return {
        pageId,
        initialValues: state.pages.pageEdit
    };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    onLoad: () => {
        const { pageId } = ownProps.match.params;
        if (pageId) {
            dispatch(actions_1.fetchPage(pageId));
        }
        else {
            dispatch(actions_1.receivePage({ enabled: true }));
        }
    },
    onSubmit: page => {
        if (page.id) {
            dispatch(actions_1.updatePage(page));
        }
        else {
            dispatch(actions_1.createPage(page));
            ownProps.history.push("/admin/pages");
        }
    },
    eraseData: () => {
        dispatch(actions_1.receivePage(null));
    }
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(form_1.default);
//# sourceMappingURL=index.js.map