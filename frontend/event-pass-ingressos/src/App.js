import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import Navbar from './components//Navbar/Navbar';
import Footer from './components/Footer/Footer';

//pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

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
                </Routes>
            </div>
          <Footer/>  
          </AuthProvider>
        </BrowserRouter>
    </div>
  )
}

export default App;
