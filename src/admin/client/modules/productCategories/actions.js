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
const text_1 = __importDefault(require("lib/text"));
const t = __importStar(require("./actionTypes"));
function requestCategories() {
    return {
        type: t.CATEGORIES_REQUEST
    };
}
function receiveCategories(items) {
    return {
        type: t.CATEGORIES_RECEIVE,
        items
    };
}
function receiveErrorCategories(error) {
    return {
        type: t.CATEGORIES_FAILURE,
        error
    };
}
function selectCategory(id) {
    return {
        type: t.CATEGORIES_SELECT,
        selectedId: id
    };
}
exports.selectCategory = selectCategory;
function deselectCategory() {
    return {
        type: t.CATEGORIES_DESELECT
    };
}
exports.deselectCategory = deselectCategory;
function requestUpdateCategory(id) {
    return {
        type: t.CATEGORY_UPDATE_REQUEST
    };
}
function receiveUpdateCategory() {
    return {
        type: t.CATEGORY_UPDATE_SUCCESS
    };
}
function errorUpdateCategory(error) {
    return {
        type: t.CATEGORY_UPDATE_FAILURE,
        error
    };
}
function successCreateCategory(id) {
    return {
        type: t.CATEGORY_CREATE_SUCCESS
    };
}
function successDeleteCategory(id) {
    return {
        type: t.CATEGORY_DELETE_SUCCESS
    };
}
function successMoveUpDownCategory(newPosition) {
    return {
        type: t.CATEGORY_MOVE_UPDOWN_SUCCESS,
        position: newPosition
    };
}
function successReplaceCategory(newParentId) {
    return {
        type: t.CATEGORY_REPLACE_SUCCESS
    };
}
function imageUploadStart() {
    return {
        type: t.CATEGORY_IMAGE_UPLOAD_START
    };
}
function imageUploadEnd() {
    return {
        type: t.CATEGORY_IMAGE_UPLOAD_END
    };
}
function fetchCategories() {
    return dispatch => {
        dispatch(requestCategories());
        return api_1.default.productCategories
            .list()
            .then(({ status, json }) => {
            json.forEach((element, index, theArray) => {
                if (theArray[index].name === "") {
                    theArray[index].name = `<${text_1.default.draft}>`;
                }
            });
            dispatch(receiveCategories(json));
        })
            .catch(error => {
            dispatch(receiveErrorCategories(error));
        });
    };
}
exports.fetchCategories = fetchCategories;
function shouldFetchCategories(state) {
    const categories = state.productCategories;
    if (categories.isFetched || categories.isFetching) {
        return false;
    }
    return true;
}
function fetchCategoriesIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchCategories(getState())) {
            return dispatch(fetchCategories());
        }
    };
}
exports.fetchCategoriesIfNeeded = fetchCategoriesIfNeeded;
function sendUpdateCategory(id, data) {
    return dispatch => {
        dispatch(requestUpdateCategory(id));
        return api_1.default.productCategories
            .update(id, data)
            .then(({ status, json }) => {
            dispatch(receiveUpdateCategory());
            dispatch(fetchCategories());
        })
            .catch(error => {
            dispatch(errorUpdateCategory(error));
        });
    };
}
function updateCategory(data) {
    return (dispatch, getState) => dispatch(sendUpdateCategory(data.id, data));
}
exports.updateCategory = updateCategory;
function createCategory() {
    return (dispatch, getState) => api_1.default.productCategories
        .create({ enabled: false })
        .then(({ status, json }) => {
        dispatch(successCreateCategory(json.id));
        dispatch(fetchCategories());
        dispatch(selectCategory(json.id));
    })
        .catch(error => {
        console.log(error);
    });
}
exports.createCategory = createCategory;
function deleteImage() {
    return (dispatch, getState) => {
        const state = getState();
        const categoryId = state.productCategories.selectedId;
        return api_1.default.productCategories
            .deleteImage(categoryId)
            .then(({ status, json }) => {
            if (status === 200) {
                dispatch(fetchCategories());
            }
            else {
                throw status;
            }
        })
            .catch(error => {
            console.log(error);
        });
    };
}
exports.deleteImage = deleteImage;
function deleteCategory(id) {
    return (dispatch, getState) => api_1.default.productCategories
        .delete(id)
        .then(({ status, json }) => {
        if (status === 200) {
            dispatch(successDeleteCategory(id));
            dispatch(deselectCategory());
            dispatch(fetchCategories());
        }
        else {
            throw status;
        }
    })
        .catch(error => {
        console.log(error);
    });
}
exports.deleteCategory = deleteCategory;
function moveCategory(allCategories = [], selectedCategory, isUp = true) {
    return new Promise((resolve, reject) => {
        if (isUp) {
            allCategories = allCategories
                .filter(e => e.parent_id === selectedCategory.parent_id &&
                e.id !== selectedCategory.id &&
                e.position < selectedCategory.position)
                .sort((a, b) => b.position - a.position);
        }
        else {
            allCategories = allCategories
                .filter(e => e.parent_id === selectedCategory.parent_id &&
                e.id !== selectedCategory.id &&
                e.position > selectedCategory.position)
                .sort((a, b) => a.position - b.position);
        }
        if (allCategories.length > 0) {
            const targetCategory = allCategories[0];
            const newPosition = targetCategory.position;
            api_1.default.productCategories
                .update(selectedCategory.id, { position: targetCategory.position })
                .then(() => {
                api_1.default.productCategories
                    .update(targetCategory.id, { position: selectedCategory.position })
                    .then(() => {
                    resolve(newPosition);
                })
                    .catch(err => {
                    reject(err);
                });
            })
                .catch(err => {
                reject(err);
            });
        }
    });
}
function moveUpCategory() {
    return (dispatch, getState) => {
        const state = getState();
        const allCategories = state.productCategories.items;
        const selectedCategory = allCategories.find(item => item.id === state.productCategories.selectedId);
        const isUp = true;
        return moveCategory(allCategories, selectedCategory, isUp).then(newPosition => {
            dispatch(successMoveUpDownCategory(newPosition));
            dispatch(fetchCategories());
        });
    };
}
exports.moveUpCategory = moveUpCategory;
function moveDownCategory() {
    return (dispatch, getState) => {
        const state = getState();
        const allCategories = state.productCategories.items;
        const selectedCategory = allCategories.find(item => item.id === state.productCategories.selectedId);
        const isUp = false;
        return moveCategory(allCategories, selectedCategory, isUp).then(newPosition => {
            dispatch(successMoveUpDownCategory(newPosition));
            dispatch(fetchCategories());
        });
    };
}
exports.moveDownCategory = moveDownCategory;
function replaceCategory(parentId) {
    return (dispatch, getState) => {
        const state = getState();
        const selectedCategory = state.productCategories.items.find(item => item.id === state.productCategories.selectedId);
        return api_1.default.productCategories
            .update(selectedCategory.id, { parent_id: parentId })
            .then(({ status, json }) => {
            dispatch(successReplaceCategory());
            dispatch(fetchCategories());
        })
            .catch(error => {
            console.log(error);
        });
    };
}
exports.replaceCategory = replaceCategory;
function uploadImage(form) {
    return (dispatch, getState) => {
        const state = getState();
        const categoryId = state.productCategories.selectedId;
        dispatch(imageUploadStart());
        return api_1.default.productCategories
            .uploadImage(categoryId, form)
            .then(() => {
            dispatch(imageUploadEnd());
            dispatch(fetchCategories());
        })
            .catch(error => {
            dispatch(imageUploadEnd());
        });
    };
}
exports.uploadImage = uploadImage;
//# sourceMappingURL=actions.js.map