import React from 'react'
import Login from '../Pages/Login'
import  Signup  from '../Pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Admin from '../Pages/Admin'
import AddProduct from '../Pages/AddProduct'
import EditProduct from '../Pages/EditProduct'
import SingleProduct from '../Pages/SingleProduct'
import MyProduct from '../Pages/MyProduct'

const MainRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Login/>} ></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/admin' element={<Admin/>}></Route>
            <Route path='/addproduct' element={<AddProduct/>}></Route>
            <Route path='/singleproduct/:id' element={<SingleProduct/>}></Route>
            <Route path='/myproduct' element={<MyProduct/>}></Route>
        </Routes>
    </>
  )
}

export default MainRoutes