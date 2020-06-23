"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const form_1 = __importDefault(require("./components/form"));
const mapStateToProps = state => ({
    pages: state.pages.pages
});
const mapDispatchToProps = dispatch => ({
    onLoad: () => {
        dispatch(actions_1.fetchPages());
    }
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(form_1.default);
//# sourceMappingURL=index.js.map