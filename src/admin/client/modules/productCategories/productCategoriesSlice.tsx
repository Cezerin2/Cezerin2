import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "lib/api"
import { RootState } from "lib/store"
import messages from "lib/text"

// Define a type for the slice state
interface ProductCategoriesState {
  items: any[]
  isFetched: boolean
  isFetching: boolean
  isSaving: boolean
  uploadingImage: boolean
  errorFetch: null
  errorUpdate: null
  selectedId: "all"
}

// Define the initial state using that type
const initialState: ProductCategoriesState = {
  items: [],
  isFetched: false,
  isFetching: false,
  isSaving: false,
  uploadingImage: false,
  errorFetch: null,
  errorUpdate: null,
  selectedId: "all",
}

export const productCategoriesSlice = createSlice({
  name: "productCategories",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    requestCategories: state => {
      state.isFetching = true
    },
    receiveCategories: (state, { payload }: PayloadAction<any>) => {
      state.isFetching = false
      state.isFetched = true
      state.items = payload
    },
    receiveErrorCategories: (state, { payload }: PayloadAction<any>) => {
      state.errorFetch = payload
    },
    selectCategory: (state, { payload }: PayloadAction<string>) => {
      state.selectedId = payload
    },
    deselectCategory: state => {
      state.selectedId = null
    },
    requestUpdateCategory: (state, { payload }: PayloadAction<string>) => {
      state.isSaving = true
    },
    receiveUpdateCategory: state => {
      state.isSaving = false
    },
    errorUpdateCategory: (state, { payload }: PayloadAction<any>) => {
      state.isSaving = false
      state.errorUpdate = payload
    },
    successCreateCategory: (state, { payload }: PayloadAction<string>) => {},
    successDeleteCategory: (state, { payload }: PayloadAction<string>) => {},
    successMoveUpDownCategory: (state, { payload }: PayloadAction<any>) => {},
    successReplaceCategory: (state, { payload }: PayloadAction<string>) => {},
    imageUploadStart: state => {
      state.uploadingImage = true
    },
    imageUploadEnd: state => {
      state.uploadingImage = false
    },
  },
})

export const {
  requestCategories,
  receiveCategories,
  receiveErrorCategories,
  selectCategory,
  deselectCategory,
  requestUpdateCategory,
  receiveUpdateCategory,
  errorUpdateCategory,
  successCreateCategory,
  successDeleteCategory,
  successMoveUpDownCategory,
  successReplaceCategory,
  imageUploadStart,
  imageUploadEnd,
} = productCategoriesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectProductCategories = (state: RootState) =>
  state.productCategories

export default productCategoriesSlice.reducer

export function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories())
    return api.productCategories
      .list()
      .then(({ status, json }) => {
        json.forEach((element, index, theArray) => {
          if (theArray[index].name === "") {
            theArray[index].name = `<${messages.draft}>`
          }
        })

        dispatch(receiveCategories(json))
      })
      .catch(error => {
        dispatch(receiveErrorCategories(error))
      })
  }
}

function shouldFetchCategories(state) {
  const categories = state.productCategories
  if (categories.isFetched || categories.isFetching) {
    return false
  } else {
    return true
  }
}

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCategories(getState())) {
      return dispatch(fetchCategories())
    }
  }
}

function sendUpdateCategory(id, data) {
  return dispatch => {
    dispatch(requestUpdateCategory(id))
    return api.productCategories
      .update(id, data)
      .then(({ status, json }) => {
        dispatch(receiveUpdateCategory())
        dispatch(fetchCategories())
      })
      .catch(error => {
        dispatch(errorUpdateCategory(error))
      })
  }
}

export function updateCategory(data) {
  return (dispatch, getState) => {
    return dispatch(sendUpdateCategory(data.id, data))
  }
}

export function createCategory() {
  return (dispatch, getState) => {
    return api.productCategories
      .create({ enabled: false })
      .then(({ status, json }) => {
        dispatch(successCreateCategory(json.id))
        dispatch(fetchCategories())
        dispatch(selectCategory(json.id))
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}

export function deleteImage() {
  return (dispatch, getState) => {
    const state = getState()
    const categoryId = state.productCategories.selectedId

    return api.productCategories
      .deleteImage(categoryId)
      .then(({ status, json }) => {
        if (status === 200) {
          dispatch(fetchCategories())
        } else {
          throw status
        }
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}

export function deleteCategory(id) {
  return (dispatch, getState) => {
    return api.productCategories
      .delete(id)
      .then(({ status, json }) => {
        if (status === 200) {
          dispatch(successDeleteCategory(id))
          dispatch(deselectCategory())
          dispatch(fetchCategories())
        } else {
          throw status
        }
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}

function moveCategory(allCategories = [], selectedCategory, isUp = true) {
  return new Promise((resolve, reject) => {
    if (isUp) {
      allCategories = allCategories
        .filter(
          e =>
            e.parent_id === selectedCategory.parent_id &&
            e.id !== selectedCategory.id &&
            e.position < selectedCategory.position
        )
        .sort((a, b) => b.position - a.position)
    } else {
      allCategories = allCategories
        .filter(
          e =>
            e.parent_id === selectedCategory.parent_id &&
            e.id !== selectedCategory.id &&
            e.position > selectedCategory.position
        )
        .sort((a, b) => a.position - b.position)
    }

    if (allCategories.length > 0) {
      let targetCategory = allCategories[0]
      let newPosition = targetCategory.position

      api.productCategories
        .update(selectedCategory.id, { position: targetCategory.position })
        .then(() => {
          api.productCategories
            .update(targetCategory.id, { position: selectedCategory.position })
            .then(() => {
              resolve(newPosition)
            })
            .catch(error => {
              reject(error)
            })
        })
        .catch(error => {
          reject(error)
        })
    }
  })
}

export function moveUpCategory() {
  return (dispatch, getState) => {
    let state = getState()
    var allCategories = state.productCategories.items
    var selectedCategory = allCategories.find(
      item => item.id === state.productCategories.selectedId
    )

    var isUp = true

    return moveCategory(allCategories, selectedCategory, isUp).then(
      newPosition => {
        dispatch(successMoveUpDownCategory(newPosition))
        dispatch(fetchCategories())
      }
    )
  }
}

export function moveDownCategory() {
  return (dispatch, getState) => {
    let state = getState()
    var allCategories = state.productCategories.items
    var selectedCategory = allCategories.find(
      item => item.id === state.productCategories.selectedId
    )
    var isUp = false

    return moveCategory(allCategories, selectedCategory, isUp).then(
      newPosition => {
        dispatch(successMoveUpDownCategory(newPosition))
        dispatch(fetchCategories())
      }
    )
  }
}

export function replaceCategory(parentId) {
  return (dispatch, getState) => {
    let state = getState()
    var selectedCategory = state.productCategories.items.find(
      item => item.id === state.productCategories.selectedId
    )

    return api.productCategories
      .update(selectedCategory.id, { parent_id: parentId })
      .then(({ status, json }) => {
        dispatch(successReplaceCategory())
        dispatch(fetchCategories())
      })
      .catch(error => {
        //dispatch error
        console.log(error)
      })
  }
}

export function uploadImage(form) {
  return (dispatch, getState) => {
    const state = getState()
    const categoryId = state.productCategories.selectedId

    dispatch(imageUploadStart())
    return api.productCategories
      .uploadImage(categoryId, form)
      .then(() => {
        dispatch(imageUploadEnd())
        dispatch(fetchCategories())
      })
      .catch(error => {
        dispatch(imageUploadEnd())
      })
  }
}
