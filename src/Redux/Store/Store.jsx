import {configureStore,combineReducers} from "@reduxjs/toolkit"

import Avaltopoly from "../Slices/Avaltopoly";
import Avaltorgb from "../Slices/Avaltorgb";
import Polytoaval from "../Slices/Polytoaval";
import Polytorgb from "../Slices/Polytorgb";
import AvalApprove from "../Slices/AvalApprove";
import Polyapprove from "../Slices/Polyapprove";
const combinedReducer = combineReducers({
    avaltopoly:Avaltopoly,
    avaltorgb:Avaltorgb,
    polytorgb:Polytorgb,
    polytoaval:Polytoaval,
    polyapprove:Polyapprove,
    avalapprove:AvalApprove
})

const rootReducer = (state,action)=>{
    return combinedReducer(state,action);
}

export default configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>{
       return getDefaultMiddleware().concat();
    }
})