"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const text_1 = __importDefault(require("lib/text"));
const List_1 = require("material-ui/List");
const FontIcon_1 = __importDefault(require("material-ui/FontIcon"));
const styles = {
    selectedItem: {
        backgroundColor: "rgba(0, 0, 0, 0.1)"
    },
    innerItem: {
        paddingLeft: 55
    },
    nestedListStyle: {
        padding: "0 0 0 15px"
    }
};
const FolderIcon = react_1.default.createElement(FontIcon_1.default, { className: "material-icons" }, "folder");
const DraftIcon = react_1.default.createElement(FontIcon_1.default, { className: "material-icons" }, "visibility_off");
class Item extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = () => {
            const { item } = this.props;
            this.props.onSelect(item.id);
        };
    }
    render() {
        const { item, opened, selectedId, nestedItems } = this.props;
        const icon = item.enabled ? FolderIcon : DraftIcon;
        const style = item.id === selectedId ? styles.selectedItem : null;
        return (react_1.default.createElement(List_1.ListItem, { className: "treeItem", initiallyOpen: opened, style: style, innerDivStyle: styles.innerItem, primaryText: item.name, nestedItems: nestedItems, leftIcon: icon, onClick: this.handleClick, nestedListStyle: styles.nestedListStyle }));
    }
}
class Categories extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleClickAll = () => {
            this.props.onSelect("all");
            document.getElementsByClassName("product-list")[0].style.display = "block";
            if (document.getElementsByClassName("spread-sheet-container")[0] !== undefined) {
                document.getElementsByClassName("spread-sheet-container")[0].style.display = "none";
            }
        };
        this.handleClickRoot = () => {
            this.props.onSelect("root");
            document.getElementsByClassName("product-list")[0].style.display = "block";
            if (document.getElementsByClassName("spread-sheet-container")[0] !== undefined) {
                document.getElementsByClassName("spread-sheet-container")[0].style.display = "none";
            }
        };
        this.handleClickImport = () => {
            document.getElementsByClassName("product-list")[0].style.display = "none";
            if (document.getElementsByClassName("spread-sheet-container")[0] !== undefined) {
                document.getElementsByClassName("spread-sheet-container")[0].style.display = "block";
            }
        };
    }
    componentDidMount() {
        this.props.onLoad();
    }
    getItem(selectedId, allItems, item, opened) {
        const nestedItems = this.getChildren(selectedId, allItems, item.id, opened);
        return (react_1.default.createElement(Item, { key: item.id, item: item, opened: opened, selectedId: selectedId, nestedItems: nestedItems, onSelect: this.props.onSelect }));
    }
    getChildren(selectedId, allItems, id, opened) {
        if (allItems && id) {
            return allItems
                .filter(item => item.parent_id === id)
                .map(item => this.getItem(selectedId, allItems, item, opened));
        }
        return [];
    }
    render() {
        const { selectedId, items, showAll = false, showRoot = false, showManage = false, showImport = true, rootName = text_1.default.productCategories_root, allName = text_1.default.productCategories_all, opened = false } = this.props;
        const rows = items
            .filter(item => item.parent_id === null)
            .map(item => this.getItem(selectedId, items, item, opened));
        return (react_1.default.createElement(List_1.List, null,
            showRoot && (react_1.default.createElement(List_1.ListItem, { primaryText: rootName, style: selectedId === "root" ? styles.selectedItem : null, innerDivStyle: styles.innerItem, leftIcon: react_1.default.createElement(FontIcon_1.default, { className: "material-icons" }, "home"), onClick: this.handleClickRoot })),
            showAll && (react_1.default.createElement(List_1.ListItem, { className: "treeItem", primaryText: allName, style: selectedId === "all" ? styles.selectedItem : null, innerDivStyle: styles.innerItem, leftIcon: react_1.default.createElement(FontIcon_1.default, { className: "material-icons" }, "folder"), onClick: this.handleClickAll })),
            rows,
            showManage && (react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/products/categories", style: { textDecoration: "none" } },
                react_1.default.createElement(List_1.ListItem, { className: "treeItem", primaryText: text_1.default.productCategories_titleEditMany, innerDivStyle: styles.innerItem, leftIcon: react_1.default.createElement(FontIcon_1.default, { className: "material-icons" }, "settings") }))),
            showImport && (react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/products/import", style: { textDecoration: "none" } },
                react_1.default.createElement(List_1.ListItem, { className: "treeItem", primaryText: text_1.default.drawer_importing, innerDivStyle: styles.innerItem, leftIcon: react_1.default.createElement(FontIcon_1.default, { className: "material-icons" }, "get_app"), onClick: this.handleClickImport })))));
    }
}
exports.default = Categories;
//# sourceMappingURL=list.js.map