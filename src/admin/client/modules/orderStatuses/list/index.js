"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const actions_1 = require("../actions");
const actions_2 = require("../../orders/actions");
const list_1 = __importDefault(require("../components/list"));
const mapStateToProps = state => ({
    items: state.orderStatuses.items,
    selectedId: state.orderStatuses.selectedId
});
const mapDispatchToProps = dispatch => ({
    onLoad: () => {
        dispatch(actions_1.fetchStatusesIfNeeded());
    },
    onSelect: statusId => {
        dispatch(actions_1.selectStatus(statusId));
        dispatch(actions_2.fetchOrders());
    }
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(list_1.default);
//# sourceMappingURL=index.js.map