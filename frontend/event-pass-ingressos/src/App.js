import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

//components
import Navbar from './components//Navbar/Navbar'
import Footer from './components/Footer/Footer'

//pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import UserProfile from './pages/UserProfile/UserProfile'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import RegisterEvent from './pages/RegisterEvent/RegisterEvent'

//context
import { AuthProvider } from "./context/AuthContext"


function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <AuthProvider>
            <Navbar/>
            <div className="appContent">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/register/event" element={<RegisterEvent/>}/>
                    <Route path="/profile" element={<UserProfile/>}/>
                    <Route path="/profile/change" element={<ChangePassword/>}/>
                </Routes>
            </div>
          <Footer/>  
          </AuthProvider>
        </BrowserRouter>
    </div>
  )
}

export default App;
