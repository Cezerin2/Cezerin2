"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const text_1 = __importDefault(require("lib/text"));
const FontIcon_1 = __importDefault(require("material-ui/FontIcon"));
const IconButton_1 = __importDefault(require("material-ui/IconButton"));
const Buttons = () => (react_1.default.createElement("span", null,
    react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/pages/add" },
        react_1.default.createElement(IconButton_1.default, { touch: true, tooltipPosition: "bottom-left", tooltip: text_1.default.settings_addPage },
            react_1.default.createElement(FontIcon_1.default, { color: "#fff", className: "material-icons" }, "add")))));
exports.default = Buttons;
//# sourceMappingURL=headButtons.js.map