import { useContext, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import axios from "axios"

import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Messages from "./pages/Messages"

import ProtectedRoute from "./components/ProtectedRoute"

import { AuthContext } from "./context/AuthReducer"

function App() {
  const { user, dispatch } = useContext(AuthContext)

  let accessToken = user && user.access_key ? user.access_key : ""

  const refreshTokens = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/refresh_token",
        { refresh_key: user.refresh_key }
      )
      dispatch({ type: "REFRESH_TOKEN", payload: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (accessToken) {
      let interval = setInterval(() => {
        refreshTokens()
      }, 2 * 60000)
      return () => clearInterval(interval)
    }
  }, [accessToken])

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/profile/messages" element={<ProtectedRoute />}>
            <Route path="/profile/messages" element={<Messages />} />
          </Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
