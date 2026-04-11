import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import DetectNews from './pages/DetectNews';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Footer from './components/Footer';

function App() {
  const { loading } = useContext(AuthContext)
  if(loading){
    return <div>Loading...</div>
  }
  return (
// #0F172A
    <div className='bg-[#0F172A] min-h-screen'> 
      <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/About' element={<About/>} />
          <Route path='/DetectNews' element={<DetectNews/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/SignUp' element={<SignUp/>} />
        </Routes>
        <Footer/>
    </div>

  );
}

export default App;
