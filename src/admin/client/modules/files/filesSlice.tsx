import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "lib/store"

// Define a type for the slice state
interface FilesState {
  files: File[]
  uploading: boolean
}

// Define the initial state using that type
const initialState: FilesState = {
  files: [],
  uploading: false,
}

const { actions, reducer } = createSlice({
  name: "files",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
})

export const {} = actions

// Other code such as selectors can use the imported `RootState` type
export const select = (state: RootState) => state

export default reducer
