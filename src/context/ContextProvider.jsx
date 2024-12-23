import { createContext, useEffect, useState } from "react";
import { getLoggedUserData } from "../services/auth.service";

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState('');
  const [numPedidos, setNumPedidos] = useState(0);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    getLoggedUserData()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de usuario', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AppContext.Provider value={{
      userData,
      setUserData,
      search,
      setSearch,
      numPedidos,
      setNumPedidos,
      loading,
      setLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
