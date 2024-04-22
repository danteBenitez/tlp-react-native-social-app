import { createContext, useState, useContext } from "react";

const ANON_USER = {
    username: "Anon",
    profilePic: null
}

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(ANON_USER);

    const updateUser = () => {
        setUser(user);
    }

    return <UserContext.Provider value={{
        user,
        updateUser
    }}>
        {children}
    </UserContext.Provider>
}