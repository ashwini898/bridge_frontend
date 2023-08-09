import { createSlice} from "@reduxjs/toolkit"
import {getPolytorgb} from "../Apis/ApisServices"

export const STATUSES = Object.freeze({
    IDEL:'idle',
    ERROR : 'error',
    LOADING:'loading'
})


const polytorgb = createSlice({
    name :"polytorgb",
    initialState:{
        data:[],
        status:STATUSES.IDEL
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getPolytorgb.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        }).addCase(getPolytorgb.fulfilled,(state,action)=>{
            state.status=STATUSES.IDEL
            state.data=action.payload
        }).addCase(getPolytorgb.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
    }
})

export default polytorgb.reducer;