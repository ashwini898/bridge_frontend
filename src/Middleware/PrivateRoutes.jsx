import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Outlet } from 'react-router-dom'
export default function PrivateRoutes({children}) {
  return <Layout>{children || <Outlet/>}</Layout>
}
