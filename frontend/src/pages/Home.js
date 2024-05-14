import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Login from '../components/Auth/Login';
import Logout from '../components/Auth/Logout';


const Home = () => {
    const { isAuthenticated } = useAuth0();
    
    console.log("Authenticated:", isAuthenticated);

    return (
        <div className="home">
            <h1>Happenstance</h1>
            <p>Browse with Friends!</p>
            {isAuthenticated ? (
                <Logout />
            ) : (
                <Login />
            )}
        </div>
    );
};

export default Home;