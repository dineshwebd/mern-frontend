
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Logins'
import Home from './pages/Home'
import Signup from './pages/SignUp'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}> </Route>
      <Route path='/login' element={<Login/>}> </Route>
      <Route path='/signup' element={<Signup/>}> </Route>

    </Routes>

    
    </BrowserRouter>
    </>
  )
}

export default App
