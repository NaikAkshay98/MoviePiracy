
import { createContext, useState } from 'react';


export const UserContext = createContext({
    user: null,
    setUser: () => {},
    signOut: () => {}
  });
  
  export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    const signOut = () => {
      localStorage.removeItem('user');
      setUser(null);
      
    };
  
    return (
      <UserContext.Provider value={{ user, setUser, signOut }}>
        {children}
      </UserContext.Provider>
    );
  };
  