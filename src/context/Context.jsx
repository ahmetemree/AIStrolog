import React, { createContext, useState, useContext, useEffect } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [eSelected, setESelected] = useState(() => {
    // Local Storage'dan başlangıç değerini al
    const storedValue = localStorage.getItem('eSelected');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // eSelected değeri değiştiğinde Local Storage'a kaydet
  useEffect(() => {
    localStorage.setItem('eSelected', JSON.stringify(eSelected));
  }, [eSelected]);

  return (
    <MyContext.Provider value={{ eSelected, setESelected }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);