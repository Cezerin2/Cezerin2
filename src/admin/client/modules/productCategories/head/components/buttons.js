"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const text_1 = __importDefault(require("lib/text"));
const select_1 = __importDefault(require("modules/productCategories/select"));
const deleteConfirmation_1 = __importDefault(require("modules/shared/deleteConfirmation"));
const FontIcon_1 = __importDefault(require("material-ui/FontIcon"));
const IconButton_1 = __importDefault(require("material-ui/IconButton"));
const Dialog_1 = __importDefault(require("material-ui/Dialog"));
const FlatButton_1 = __importDefault(require("material-ui/FlatButton"));
const { Fragment } = react_1.default;
class Buttons extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.showMoveTo = () => {
            this.setState({ openMoveTo: true });
        };
        this.showDelete = () => {
            this.setState({ openDelete: true });
        };
        this.closeMoveTo = () => {
            this.setState({ openMoveTo: false });
        };
        this.closeDelete = () => {
            this.setState({ openDelete: false });
        };
        this.deleteCategory = () => {
            this.setState({ openDelete: false });
            this.props.onDelete(this.props.selected.id);
        };
        this.saveMoveTo = () => {
            this.setState({ openMoveTo: false });
            this.props.onMoveTo(this.state.categoryIdMoveTo);
        };
        this.selectMoveTo = categoryId => {
            this.setState({ categoryIdMoveTo: categoryId });
        };
        this.state = {
            categoryIdMoveTo: "root",
            openMoveTo: false,
            openDelete: false
        };
    }
    render() {
        const { selected, onMoveUp, onMoveDown, onDelete, onCreate } = this.props;
        const categoryName = selected && selected.name && selected.name.length > 0
            ? selected.name
            : "Draft";
        const actionsMoveTo = [
            react_1.default.createElement(FlatButton_1.default, { label: text_1.default.cancel, onClick: this.closeMoveTo, style: { marginRight: 10 } }),
            react_1.default.createElement(FlatButton_1.default, { label: text_1.default.actions_moveHere, primary: true, keyboardFocused: true, onClick: this.saveMoveTo })
        ];
        return (react_1.default.createElement("span", null,
            selected && (react_1.default.createElement(Fragment, null,
                react_1.default.createElement(IconButton_1.default, { touch: true, tooltipPosition: "bottom-left", tooltip: text_1.default.actions_moveUp, onClick: onMoveUp },
                    react_1.default.createElement(FontIcon_1.default, { color: "#fff", className: "material-icons" }, "arrow_upward")),
                react_1.default.createElement(IconButton_1.default, { touch: true, tooltipPosition: "bottom-left", tooltip: text_1.default.actions_moveDown, onClick: onMoveDown },
                    react_1.default.createElement(FontIcon_1.default, { color: "#fff", className: "material-icons" }, "arrow_downward")),
                react_1.default.createElement(IconButton_1.default, { touch: true, tooltipPosition: "bottom-left", tooltip: text_1.default.actions_delete, onClick: this.showDelete },
                    react_1.default.createElement(FontIcon_1.default, { color: "#fff", className: "material-icons" }, "delete")),
                react_1.default.createElement(IconButton_1.default, { touch: true, tooltipPosition: "bottom-left", tooltip: text_1.default.actions_moveTo, onClick: this.showMoveTo },
                    react_1.default.createElement(FontIcon_1.default, { color: "#fff", className: "material-icons" }, "folder")),
                react_1.default.createElement(Dialog_1.default, { title: text_1.default.actions_moveTo, actions: actionsMoveTo, modal: false, open: this.state.openMoveTo, onRequestClose: this.closeMoveTo, autoScrollBodyContent: true },
                    react_1.default.createElement(select_1.default, { onSelect: this.selectMoveTo, selectedId: this.state.categoryIdMoveTo, showRoot: true, showAll: false })),
                react_1.default.createElement(deleteConfirmation_1.default, { open: this.state.openDelete, isSingle: true, itemsCount: 1, itemName: categoryName, onCancel: this.closeDelete, onDelete: this.deleteCategory }))),
            react_1.default.createElement(IconButton_1.default, { touch: true, tooltipPosition: "bottom-left", tooltip: text_1.default.productCategories_titleAdd, onClick: onCreate },
                react_1.default.createElement(FontIcon_1.default, { color: "#fff", className: "material-icons" }, "add"))));
    }
}
exports.default = Buttons;
//# sourceMappingURL=buttons.js.map