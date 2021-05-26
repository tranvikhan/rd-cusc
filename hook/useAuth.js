import React, { useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { Cookies } from 'react-cookie'
import { loginAPI } from '../axios/auth'

const getLoggedUser = () => {
  const cookies = new Cookies()
  const user = cookies.get('user')
  let newUser = user
    ? typeof user == 'object'
      ? user
      : JSON.parse(user)
    : null
  return newUser
}
const isAuthenticated = (user) => {
  if (!user) {
    return false
  }
  const decoded = jwtDecode(user.jwt)
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    console.warn('Access token expired')
    return false
  } else {
    return true
  }
}

const setSession = (user) => {
  let cookies = new Cookies()
  if (user) {
    user.saying_vi = null
    user.saying_en = null
    user.address_vi = null
    user.address_en = null
    var date = new Date()
    date.setDate(date.getDate() + 1)
    cookies.set('user', JSON.stringify(user), {
      path: '/',
      expires: date,
    })
  } else {
    cookies.remove('user', { path: '/' })
  }
}

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const user = getLoggedUser()

    if (isAuthenticated(user)) {
      setUser(user)
    } else {
      setUser(null)
    }
    setLoading(false)
  }, [])

  async function login({ username, password, remember }) {
    setLoading(true)
    await loginAPI({ username, password })
      .then((data) => {
        setSession(null)
        if (remember) {
          setSession(data)
        }
        setError(null)
        setUser(data)
      })
      .catch((err) => {
        setError(err.info)
      })
    setLoading(false)
    return
  }
  async function logout() {
    setUser(null)
    setSession(null)
    return
  }
  const value = {
    user: user,
    loading: loading,
    error: error,
    login,
    logout,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
