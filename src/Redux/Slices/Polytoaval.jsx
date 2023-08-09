import { createSlice} from "@reduxjs/toolkit"
import {getPolytoaval} from "../Apis/ApisServices"

export const STATUSES = Object.freeze({
    IDEL:'idle',
    ERROR : 'error',
    LOADING:'loading'
})


const polytoaval = createSlice({
    name :"polytoaval",
    initialState:{
        data:[],
        status:STATUSES.IDEL
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getPolytoaval.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        }).addCase(getPolytoaval.fulfilled,(state,action)=>{
            state.status=STATUSES.IDEL
            state.data=action.payload
        }).addCase(getPolytoaval.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
    }
})

export default polytoaval.reducer;