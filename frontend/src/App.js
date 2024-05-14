import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

//import './App.css';



function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div className="App">
        {/*<Header isAuthenticated={isAuthenticated} />*/}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        {/*<Footer />*/}
      </div>
    </Router>
  );
}

export default App;
