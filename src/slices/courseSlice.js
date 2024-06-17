import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  course: null,
 
  
}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setCourse: (state, action) => {
      state.course = action.payload
    },
 
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetCourseState: (state) => {
      state.step = 1
      state.course = null
    
    },
  },
})

export const {
  setStep,
  setCourse,
  
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions

export default courseSlice.reducer