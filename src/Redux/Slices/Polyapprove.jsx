import { createSlice} from "@reduxjs/toolkit"
import {getPolyApprove} from "../Apis/ApisServices"

export const STATUSES = Object.freeze({
    IDEL:'idle',
    ERROR : 'error',
    LOADING:'loading'
})


const polyApprove = createSlice({
    name :"polyApprove",
    initialState:{
        data:[],
        status:STATUSES.IDEL
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getPolyApprove.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        }).addCase(getPolyApprove.fulfilled,(state,action)=>{
            state.status=STATUSES.IDEL
            state.data=action.payload
        }).addCase(getPolyApprove.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
    }
})

export default polyApprove.reducer;