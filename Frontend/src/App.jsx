import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import LoginPage from './components/loginPage/loginPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignupPage from './components/signupPage/signup'
import LandingPage from './components/LandingPage/LandingPage'
import { AuthProvider } from './contexts/authContext'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
