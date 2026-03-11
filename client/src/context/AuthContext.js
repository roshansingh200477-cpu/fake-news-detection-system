import { createContext, useState, useEffect, } from "react";
import {loginUser, createUser, getUser} from "../services/Api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children })=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const loadUser = async ()=>{
        const token = localStorage.getItem("token");
        if(!token){
            setLoading(false);
            return;
        }
        try {
            const res = await getUser();
            setUser(res.data);
        } catch (error) {
            console.log("User not authenticated");
            localStorage.removeItem("token");
        }
        setLoading(false);
    };

    useEffect(()=>{
        loadUser();
    }, []);

    const login = async (data)=>{
        const res = await loginUser(data);
        localStorage.setItem("token", res.data.authToken);
        await loadUser();
    }
    const signup = async (data)=>{
        const res = await createUser(data);
        localStorage.setItem("token", res.data.authToken);
        await loadUser();
    }
    const logout = async (data)=>{
        localStorage.removeItem("token");
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user, loading, login, signup, logout}}>
            {children}
        </AuthContext.Provider>
    );

};
