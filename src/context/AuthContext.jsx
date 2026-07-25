import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                setLoggedIn,
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

