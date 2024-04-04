import { User } from "@supabase/supabase-js";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface AuthContextType {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const AuthContext = createContext<AuthContextType>({user: null, setUser: () => {}});
export default AuthContext;


