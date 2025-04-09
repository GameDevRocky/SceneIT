import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  
    const [count, setCount] = useState(0)
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
    <>
      
        
    </>
  )
}

export default App
