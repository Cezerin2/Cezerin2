"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const headButtons_1 = __importDefault(require("./components/headButtons"));
const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = (dispatch, ownProps) => ({});
exports.default = react_router_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(headButtons_1.default));
//# sourceMappingURL=head.js.map