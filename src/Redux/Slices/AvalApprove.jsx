import { createSlice} from "@reduxjs/toolkit"
import {getAvalApprove} from "../Apis/ApisServices"

export const STATUSES = Object.freeze({
    IDEL:'idle',
    ERROR : 'error',
    LOADING:'loading'
})


const avalApprove = createSlice({
    name :"avalApprove",
    initialState:{
        data:[],
        status:STATUSES.IDEL
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAvalApprove.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        }).addCase(getAvalApprove.fulfilled,(state,action)=>{
            state.status=STATUSES.IDEL
            state.data=action.payload
        }).addCase(getAvalApprove.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
    }
})

export default avalApprove.reducer;