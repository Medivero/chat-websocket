import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import MainPage from './pages/mainpage'
import HeaderComponent from './widgets/header/header'
import LoginPage from './pages/LoginPage/LoginPage'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

function App() {
  const loc =  useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token") && loc.pathname !== "/login"){
      navigate("/login")
    }
  },[])
  return (
    <>
    <HeaderComponent></HeaderComponent>
    <Routes>
      <Route path='/login' element={<LoginPage></LoginPage>}></Route>
      <Route path='/' element={<MainPage></MainPage>}></Route>
    </Routes>
    </>
  )
}

export default App
