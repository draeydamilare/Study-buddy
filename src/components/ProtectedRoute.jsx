import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

function ProtectedRoute() {
  const auth = useSelector(state => state.persistedReducer.auth)
  console.log(auth)
    const isAuthenticated = auth.access_token
  return (
    <>
      {isAuthenticated ? <Outlet /> : <Navigate replace to='/' /> }  
    </>
  )
}

export default ProtectedRoute