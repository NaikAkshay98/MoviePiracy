// UserContext.js or wherever your context is defined
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
      // You might want to redirect the user to the homepage or login page here as well.
    };
  
    return (
      <UserContext.Provider value={{ user, setUser, signOut }}>
        {children}
      </UserContext.Provider>
    );
  };
  