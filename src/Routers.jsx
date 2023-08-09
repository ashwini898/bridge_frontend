import React from 'react'
import { Routes,Route} from "react-router-dom"
import PrivateRoutes from './Middleware/PrivateRoutes'
import Home from './page/Home'
export default function Routers() {
  return (
    <Routes>
        {/* private Route */}
        <Route exect path='/' element={<PrivateRoutes><Home/></PrivateRoutes>}/>
    </Routes>
  )
}
