"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Paper_1 = __importDefault(require("material-ui/Paper"));
const Divider_1 = __importDefault(require("material-ui/Divider"));
const FontIcon_1 = __importDefault(require("material-ui/FontIcon"));
const List_1 = require("material-ui/List");
const PageItem = ({ page }) => {
    const tags = page.tags && page.tags.length > 0 ? page.tags.join(", ") : "";
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Divider_1.default, null),
        react_1.default.createElement(react_router_dom_1.Link, { to: `/admin/pages/${page.id}`, style: { textDecoration: "none" } },
            react_1.default.createElement(List_1.ListItem, { rightIcon: react_1.default.createElement(FontIcon_1.default, { className: "material-icons" }, "keyboard_arrow_right"), leftIcon: page.is_system ? (react_1.default.createElement(FontIcon_1.default, { className: "material-icons" }, "lock_outline")) : null, style: !page.enabled ? { color: "rgba(0, 0, 0, 0.3)" } : {}, primaryText: react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "col-xs-8" }, page.meta_title),
                    react_1.default.createElement("div", { className: "col-xs-4", style: { color: "rgba(0, 0, 0, 0.4)" } }, tags)) }))));
};
class PagesList extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.onLoad();
    }
    render() {
        const { pages } = this.props;
        const listItems = pages.map((page, index) => (react_1.default.createElement(PageItem, { key: index, page: page })));
        return (react_1.default.createElement(Paper_1.default, { className: "paper-box", zDepth: 1 },
            react_1.default.createElement("div", { style: { width: "100%" } },
                react_1.default.createElement(List_1.List, { style: { padding: 0 } }, listItems))));
    }
}
exports.default = PagesList;
//# sourceMappingURL=form.js.map