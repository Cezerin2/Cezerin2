import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import api from "lib/api"
import { RootState } from "lib/store"

// Define a type for the slice state
interface FilesState {
  files: []
  uploading: false
}

// Define the initial state using that type
const initialState: FilesState = {
  files: [],
  uploading: false,
}

export const filesSlice = createSlice({
  name: "files",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const {} = filesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFiles = (state: RootState) => state.files

export default filesSlice.reducer

function receiveFiles(files) {
  return {
    type: t.FILES_RECEIVE,
    files,
  }
}

function filesUploadStart() {
  return {
    type: t.FILES_UPLOAD_START,
  }
}

function filesUploadEnd() {
  return {
    type: t.FILES_UPLOAD_END,
  }
}

export function fetchFiles() {
  return (dispatch, getState) => {
    return api.files
      .list()
      .then(({ status, json }) => {
        dispatch(receiveFiles(json))
      })
      .catch(error => {})
  }
}

export function uploadFiles(form) {
  return (dispatch, getState) => {
    dispatch(filesUploadStart())
    return api.files
      .upload(form)
      .then(() => {
        dispatch(filesUploadEnd())
        dispatch(fetchFiles())
      })
      .catch(error => {
        dispatch(filesUploadEnd())
      })
  }
}

export function deleteFile(fileName) {
  return (dispatch, getState) => {
    return api.files
      .delete(fileName)
      .then(() => {
        dispatch(fetchFiles())
      })
      .catch(error => {})
  }
}
