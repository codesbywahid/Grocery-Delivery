import { createContext, useContext, type ReactNode } from "react";
import type { User } from "../types";

interface AuthContextType{
    user : User | null;
    token :string | null;
    loading : boolean;
    login :(email:string , password:string)=> Promise<void>
    register :(email:string , password:string)=> Promise<void>
    logout :()=> void;
    updateUser:(userData:Partial<User>)=> void

}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}:{children:ReactNode}){
    return <AuthContext.Provider value={}>
        {children}
    </AuthContext.Provider>
}

export function useAuth(){
    const context = useContext(AuthContext)
}