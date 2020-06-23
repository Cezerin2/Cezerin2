"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const t = __importStar(require("./actionTypes"));
const initialState = {
    pages: [],
    pageEdit: null
};
exports.default = (state = initialState, action) => {
    switch (action.type) {
        case t.PAGES_RECEIVE:
            return Object.assign({}, state, { pages: action.pages });
        case t.PAGE_RECEIVE:
            return Object.assign({}, state, { pageEdit: action.pageEdit });
        default:
            return state;
    }
};
//# sourceMappingURL=reducer.js.map