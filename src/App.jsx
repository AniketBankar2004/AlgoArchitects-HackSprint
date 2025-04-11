import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About'
import Contact from './pages/contact';
import Login from './pages/Login'
import Home from './pages/Home'
import Error from './pages/Error';
import Services from './pages/Services';
import{ useGSAP} from '@gsap/react'
import gsap from 'gsap'
import Resume from './pages/Resume';

const App = () => {
  
  useGSAP(()=>{

  })

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Resume' element={<Resume/>}/>
        <Route path='/Services' element={<Services/>} />
        <Route path="*" element={<Error />} />
        

      </Routes>
    </div>
  );
};

export default App;
