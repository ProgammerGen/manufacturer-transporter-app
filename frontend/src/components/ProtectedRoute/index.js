import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthReducer"

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext)

  // const isLoggedIn = () => {
  //   const token = sessionStorage.getItem("access_token")
  //   if (!token) {
  //     return false
  //   }
  //   const decodedToken = jwt_decode(token)
  //   const currentTime = new Date().getTime() / 1000
  //   return decodedToken.exp > currentTime
  // }

  return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
