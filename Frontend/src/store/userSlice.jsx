import { createSlice } from '@reduxjs/toolkit'



export const userSlice = createSlice({
    name: 'user',
    initialState: {
      user:null,
    },
    reducers: {
     setUserDetails : (state,action)=>{
        //its a function 
        state.user=action.payload
     }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setUserDetails}=userSlice.actions
  export default userSlice.reducer



  // const initialState = {
  //   value: 0,
  // }
  
  // export const counterSlice = createSlice({
  //   name: 'counter',
  //   initialState,
  //   reducers: {
  //     increment: (state) => {
  //      state.value += 1
  //     },
  //     decrement: (state) => {
  //       state.value -= 1
  //     },
  //     incrementByAmount: (state, action) => {
  //       state.value += action.payload
  //     },
  //   },
  // })