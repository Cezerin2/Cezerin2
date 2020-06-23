"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const List_1 = require("material-ui/List");
const FontIcon_1 = __importDefault(require("material-ui/FontIcon"));
const Checkbox_1 = __importDefault(require("material-ui/Checkbox"));
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
        this.handleCheck = (event, isInputChecked) => {
            const { item } = this.props;
            this.props.onCheck(item.id);
        };
    }
    render() {
        const { item, opened, selectedIds, nestedItems } = this.props;
        const isChecked = selectedIds && selectedIds.length > 0 && selectedIds.includes(item.id);
        return (react_1.default.createElement(List_1.ListItem, { className: "treeItem", initiallyOpen: opened, innerDivStyle: styles.innerItem, primaryText: item.name, nestedItems: nestedItems, leftCheckbox: react_1.default.createElement(Checkbox_1.default, { checked: isChecked, onCheck: this.handleCheck }), nestedListStyle: styles.nestedListStyle }));
    }
}
class Categories extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    getItem(selectedIds, allItems, item, opened) {
        const nestedItems = this.getChildren(selectedIds, allItems, item.id, opened);
        return (react_1.default.createElement(Item, { key: item.id, item: item, opened: opened, selectedIds: selectedIds, nestedItems: nestedItems, onCheck: this.props.onCheck }));
    }
    getChildren(selectedIds, allItems, id, opened) {
        if (allItems && id) {
            return allItems
                .filter(item => item.parent_id === id)
                .map(item => this.getItem(selectedIds, allItems, item, opened));
        }
        return [];
    }
    render() {
        const { selectedIds, items, opened = false } = this.props;
        const rows = items
            .filter(item => item.parent_id === null)
            .map(item => this.getItem(selectedIds, items, item, opened));
        return react_1.default.createElement(List_1.List, null, rows);
    }
}
exports.default = Categories;
//# sourceMappingURL=multiselectList.js.map