"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const actions_2 = require("../../products/actions");
const list_1 = __importDefault(require("../components/list"));
const mapStateToProps = state => ({
    items: state.productCategories.items,
    selectedId: state.productCategories.selectedId
});
const mapDispatchToProps = dispatch => ({
    onLoad: () => {
        dispatch(actions_1.fetchCategoriesIfNeeded());
    },
    onSelect: categoryId => {
        dispatch(actions_1.selectCategory(categoryId));
        dispatch(actions_2.fetchProducts());
    },
    onCreate: () => {
        dispatch(createCategory());
    }
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(list_1.default);
//# sourceMappingURL=index.js.map