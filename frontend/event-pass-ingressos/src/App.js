import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import Navbar from './components//Navbar/Navbar';

//pages
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';



function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>

            <div>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    </div>
  )
}

export default App;
