import React ,{ createContext , useState , useEffect, useContext } from 'react' ;
import { getCurrentUSer,login as apiLogin , logout as apiLogout } from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getCurrentUSer());
    const login = async (email, password) => {
        const data = await apiLogin(email, password);
        setUser(data.user);
        return data;
    }
    const logOut = () => {
        apiLogout();
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, login, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth(){
    return useContext(AuthContext);
}