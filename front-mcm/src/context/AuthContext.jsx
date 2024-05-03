import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/auth";

export const AuhtContext = createContext();
export const useAuth = () => {
  const context = useContext(AuhtContext)

  if (!context) {
    throw new Error("There is no AuthProvider in this tree")
  }
  return context;
}

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAthenticated] = useState(false);
  const [error, setError] = useState('');

  const signup = async (user) => {
    try{
      const res = await registerRequest(user)
      setUser(res.data);
      setIsAthenticated(true);
    }
    catch(err){
      console.log(err);
      setError(err.response.data.message);
    }
  }

  return (
    <AuhtContext.Provider value={{ signup, user, isAuthenticated, error }}>
      {children}
    </AuhtContext.Provider>
  )
}