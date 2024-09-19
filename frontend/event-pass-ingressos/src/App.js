import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>
    </div>
  )
}

export default App;
