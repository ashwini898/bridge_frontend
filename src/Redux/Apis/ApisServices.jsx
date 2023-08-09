import {avaltopoly,avaltorgb,polytoaval,polytorgb,polyApprove,avalApprove} from "../../Apis/Endpoint";
import ApiServices from "../../Services/ApiServices";
import {createAsyncThunk} from "@reduxjs/toolkit"


const getAvaltopoly = createAsyncThunk('avaltopoly',async(body)=>{
   const response = await ApiServices.post(avaltopoly,body)
   return response.data
})

const getPolytoaval = createAsyncThunk("polytoaval",async(body)=>{
    const response = await ApiServices.post(polytoaval,body)
   return response.data
})

const getAvaltorgb = createAsyncThunk("avaltorgb",async(body)=>{
    const response = await ApiServices.post(avaltorgb,body)
   return response.data
})

const getPolytorgb = createAsyncThunk("polytorgb",async(body)=>{
   const response = await ApiServices.post(polytorgb,body)
   return response.data
})

const getPolyApprove = createAsyncThunk("polyapprove",async(body)=>{
    const response = await ApiServices.post(polyApprove,body)
    return response.data
 })

 const getAvalApprove = createAsyncThunk("avalApprove",async(body)=>{
    const response = await ApiServices.post(avalApprove,body)
    return response.data
 })

export {
    getAvaltopoly,getAvaltorgb,getPolytoaval,getPolytorgb,getPolyApprove,getAvalApprove
}