import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import ItemsList from '../components/ItemsList';
import Profile from '../components/Auth/Profile';
import Login from '../components/Auth/Login';
import Logout from '../components/Auth/Logout';

//import logo from '../logo.png';

const Home = () => {
    const { isAuthenticated } = useAuth0();
    
    console.log("Authenticated:", isAuthenticated);

    return (
        <div className="home">
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            <h1>Happenstance</h1>
            <p>Browse with Friends!</p>
            {isAuthenticated ? (
                <>
                    <Logout />
                    {/*<Profile />*/}
                    {/*<ItemsList />*/}
                </>
            ) : (
                <Login />
            )}
        </div>
    );
};

export default Home;