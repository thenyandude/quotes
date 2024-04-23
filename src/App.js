import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './css/App.css';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Login from './components/LogIn';
import UserHome from './components/UserHome';
import Home from './components/Home';
import FindQuotes from './components/FindQuotes';
import Guide from './components/Guide';
import TopQuotes from './components/TopQuotes';

import { AuthProvider } from './context/AuthContext';

function RedirectToGuide() {
  let navigate = useNavigate();

  useEffect(() => {
    let isFirstVisit = localStorage.getItem('firstVisit');
    if (isFirstVisit === null) {
      // If firstVisit is not set, set it to 'yes'
      localStorage.setItem('firstVisit', 'yes');
      isFirstVisit = 'yes';
    }

    if (isFirstVisit === 'yes') {
      navigate('/guide');
      localStorage.setItem('firstVisit', 'no');
    }
  }, [navigate]);

  return null;
}


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <RedirectToGuide /> {/* Place the navigation logic here */}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<UserHome userId={localStorage.getItem('userId')} />} />
            <Route path="/guide" element={<Guide />} />
            <Route path='/top' element = {<TopQuotes/>} />
            <Route path="/:username" element={<FindQuotes/>} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
