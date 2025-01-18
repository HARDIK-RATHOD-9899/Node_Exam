import React from 'react'
import Login from '../Pages/Login'
import  Signup  from '../Pages/Signup'
import { Route, Routes } from 'react-router-dom'

const MainRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Login/>} ></Route>
            <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
    </>
  )
}

export default MainRoutes