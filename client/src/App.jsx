
import './App.css'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import User from './page/User'
import RoundDetail from './page/RoundDetail'

function App() {  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<User/>}/>
        <Route path='/round/:id/detail' element={<RoundDetail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
