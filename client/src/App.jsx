
import './App.css'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import User from './page/User'

function App() {  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<User/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
