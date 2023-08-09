import { createSlice} from "@reduxjs/toolkit"
import {getAvaltopoly} from "../Apis/ApisServices"

export const STATUSES = Object.freeze({
    IDEL:'idle',
    ERROR : 'error',
    LOADING:'loading'
})


const avaltopoly = createSlice({
    name :"avaltopoly",
    initialState:{
        data:[],
        status:STATUSES.IDEL
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAvaltopoly.pending,(state,action)=>{
            state.status=STATUSES.LOADING
        }).addCase(getAvaltopoly.fulfilled,(state,action)=>{
            state.status=STATUSES.IDEL
            state.data=action.payload
        }).addCase(getAvaltopoly.rejected,(state,action)=>{
            state.status=STATUSES.ERROR
        })
    }
})

export default avaltopoly.reducer;