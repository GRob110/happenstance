//TODO: better understand the navigate part of this code
import React from "react";
import { AuthProvider } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const AuthProviderWithNavigate = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider auth={auth}>
          {children}
        </AuthProvider>
    );
};