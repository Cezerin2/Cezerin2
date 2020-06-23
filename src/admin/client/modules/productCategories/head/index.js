"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const redux_form_1 = require("redux-form");
const actions_1 = require("../actions");
const buttons_1 = __importDefault(require("./components/buttons"));
const mapStateToProps = state => ({
    selected: state.productCategories.items.find(item => item.id === state.productCategories.selectedId)
});
const mapDispatchToProps = dispatch => ({
    onMoveUp: () => {
        dispatch(actions_1.moveUpCategory());
    },
    onMoveDown: () => {
        dispatch(actions_1.moveDownCategory());
    },
    onDelete: id => {
        dispatch(actions_1.deleteCategory(id));
        dispatch(redux_form_1.reset("FormProductCategory"));
    },
    onMoveTo: id => {
        dispatch(actions_1.replaceCategory(id));
        dispatch(redux_form_1.reset("FormProductCategory"));
    },
    onCreate: () => {
        dispatch(actions_1.createCategory());
    }
});
exports.default = react_router_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(buttons_1.default));
//# sourceMappingURL=index.js.map