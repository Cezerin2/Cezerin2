"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const list_1 = __importDefault(require("../components/list"));
const mapStateToProps = state => ({
    items: state.productCategories.items
});
const mapDispatchToProps = dispatch => ({
    onLoad: () => {
        dispatch(actions_1.fetchCategoriesIfNeeded());
    }
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(list_1.default);
//# sourceMappingURL=index.js.map