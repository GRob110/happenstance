import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ItemsList from './components/ItemsList';
import Profile from './components/Auth/Profile';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';

import logo from './logo.png';
import './App.css';



function App() {
  const { isAuthenticated, user } = useAuth0();

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users" component={ItemsList} />
          <Route path="/profile" component={Profile} />
        </Switch>
        <Footer />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Happenstance</h1>
          <p>Browse with Friends!</p>
        </header>
        {isAuthenticated ? (
          <>
            <Logout />
            <Profile />
          </>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}

export default App;
