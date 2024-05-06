import { createContext, useState, useContext, useEffect } from "react";

const ANON_USER = {
    username: "Anon",
    profilePic: null
}

const UserContext = createContext();

export const API_URL = 'http://192.168.137.1:8083';

export const useUser = () => useContext(UserContext);

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(ANON_USER);

    const updateUser = (userInfo) => {
        setUser({ ...user, ...userInfo });
    }

    return <UserContext.Provider value={{
        user,
        updateUser
    }}>
        {children}
    </UserContext.Provider>
}