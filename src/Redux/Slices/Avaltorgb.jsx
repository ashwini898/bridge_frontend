import { createSlice} from "@reduxjs/toolkit"
import {getAvaltorgb} from "../Apis/ApisServices"

export const STATUSES = Object.freeze({
    IDEL:'idle',
    ERROR : 'error',
    LOADING:'loading'
})


const avaltorgb = createSlice({
    name :"avaltorgb",
    initialState:{
        data:[],
        status:STATUSES.IDEL
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAvaltorgb.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        }).addCase(getAvaltorgb.fulfilled,(state,action)=>{
            state.status=STATUSES.IDEL
            state.data=action.payload
        }).addCase(getAvaltorgb.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
    }
})

export default avaltorgb.reducer;