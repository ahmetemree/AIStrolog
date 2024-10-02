import React, { createContext, useState, useContext } from 'react';

const RedirectContext = createContext();

export const RedirectContextProvider = ({ children }) => {
  const [redirect, setRedirect] = useState("")

  return (
    <RedirectContext.Provider value={{ redirect, setRedirect }}>
      {children}
    </RedirectContext.Provider>
  );
};

export const useRedirectContext = () => useContext(RedirectContext);