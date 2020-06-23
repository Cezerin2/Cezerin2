"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("lib/api"));
const t = __importStar(require("./actionTypes"));
function receivePages(pages) {
    return {
        type: t.PAGES_RECEIVE,
        pages
    };
}
function receivePage(pageEdit) {
    return {
        type: t.PAGE_RECEIVE,
        pageEdit
    };
}
exports.receivePage = receivePage;
function fetchPages() {
    return (dispatch, getState) => api_1.default.pages
        .list()
        .then(({ status, json }) => {
        dispatch(receivePages(json));
    })
        .catch(error => { });
}
exports.fetchPages = fetchPages;
function fetchPage(id) {
    return (dispatch, getState) => api_1.default.pages
        .retrieve(id)
        .then(({ status, json }) => {
        dispatch(receivePage(json));
    })
        .catch(error => { });
}
exports.fetchPage = fetchPage;
function createPage(page) {
    return (dispatch, getState) => api_1.default.pages
        .create(page)
        .then(({ status, json }) => {
        dispatch(fetchPages());
    })
        .catch(error => { });
}
exports.createPage = createPage;
function updatePage(page) {
    return (dispatch, getState) => api_1.default.pages
        .update(page.id, page)
        .then(({ status, json }) => {
        dispatch(receivePage(json));
    })
        .catch(error => { });
}
exports.updatePage = updatePage;
function deletePage(pageId) {
    return (dispatch, getState) => api_1.default.pages
        .delete(pageId)
        .then(({ status, json }) => {
        dispatch(fetchPages());
    })
        .catch(error => { });
}
exports.deletePage = deletePage;
//# sourceMappingURL=actions.js.map