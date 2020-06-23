"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const text_1 = __importDefault(require("lib/text"));
const deleteConfirmation_1 = __importDefault(require("modules/shared/deleteConfirmation"));
const FontIcon_1 = __importDefault(require("material-ui/FontIcon"));
const IconButton_1 = __importDefault(require("material-ui/IconButton"));
const { Fragment } = react_1.default;
class Buttons extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.openDelete = () => {
            this.setState({ openDelete: true });
        };
        this.closeDelete = () => {
            this.setState({ openDelete: false });
        };
        this.deletePage = () => {
            this.setState({ openDelete: false });
            this.props.onDelete(this.props.page.id);
        };
        this.state = {
            openDelete: false
        };
    }
    render() {
        const { page } = this.props;
        const pageName = page && page.meta_title && page.meta_title.length > 0
            ? page.meta_title
            : "Draft";
        if (page && !page.is_system) {
            return (react_1.default.createElement(Fragment, null,
                react_1.default.createElement(IconButton_1.default, { touch: true, tooltipPosition: "bottom-left", tooltip: text_1.default.actions_delete, onClick: this.openDelete },
                    react_1.default.createElement(FontIcon_1.default, { color: "#fff", className: "material-icons" }, "delete")),
                page.enabled && (react_1.default.createElement("a", { href: page.url, target: "_blank" },
                    react_1.default.createElement(IconButton_1.default, { touch: true, tooltipPosition: "bottom-left", tooltip: text_1.default.viewOnWebsite },
                        react_1.default.createElement(FontIcon_1.default, { color: "#fff", className: "material-icons" }, "open_in_new")))),
                react_1.default.createElement(deleteConfirmation_1.default, { open: this.state.openDelete, isSingle: true, itemsCount: 1, itemName: pageName, onCancel: this.closeDelete, onDelete: this.deletePage })));
        }
        return null;
    }
}
exports.default = Buttons;
//# sourceMappingURL=headButtons.js.map