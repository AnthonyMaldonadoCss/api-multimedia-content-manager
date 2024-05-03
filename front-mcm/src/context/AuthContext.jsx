import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyRequest } from "../api/auth";
//importa las validaciones de props los propTypes
import PropTypes from "prop-types";

import Cokies from "js-cookie";

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
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try{
      const res = await registerRequest(user)
      setUser(res.data);
      localStorage.setItem('token', res.data.token);
      setIsAthenticated(true);
    }
    catch(err){
      console.log(err);
      setError(err.response.data.message);
    }
  }

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAthenticated(true);
      localStorage.setItem('token', res.data.token);
      console.log(res.data);
    }
    catch(err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('')
      }, 5000)
      return () => clearTimeout(timer);
    }
  }, [error])

  useEffect(() => {
    async function chekLogin() {
      const { token } = Cokies.get();
      console.log(token);
      if (token) {
        try{
          const res = await verifyRequest(token);

          console.log(res.data);

          if (!res.data) {
            Cokies.remove('token');
            setIsAthenticated(false);
            setUser(null);
            setLoading(false);
          }

          setIsAthenticated(true);
          setUser(res.data);
          setLoading(false);
          console.log("#estoy autenticado");
        }
        catch(err) {
          Cokies.remove('token');
          setIsAthenticated(false);
          setUser(null);
          setLoading(false);
        }
      }
      else {
        setLoading(false);
      }
    }
    chekLogin();
  }, [])

  return (
    <AuhtContext.Provider value={{ signup, signin, user, isAuthenticated, error, loading }}>
      {children}
    </AuhtContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}