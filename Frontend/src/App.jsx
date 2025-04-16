import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import LoginPage from './components/loginPage/loginPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignupPage from './components/signupPage/signup'
import LandingPage from './components/LandingPage/LandingPage'

function App() {
  
    const url = 'http://127.0.0.1:8000/base'

    useEffect(()=>{
      const getRoute = async () =>{
        try {
          const data = await axios.get(url)
          console.log(data.data)
    
        } catch (error) {
    
          console.log(error)
        }
      }

      getRoute()
    },[])

    

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>

      </Routes>
    
    </BrowserRouter>
  )
}

export default App
