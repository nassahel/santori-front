import { createContext, useEffect, useState } from "react";
import { getLoggedUserData } from "../services/auth.service";

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState({
    loggedUser: null,
    order: null,
  });
  const [search, setSearch] = useState('')
  const [numPedidos, setNumPedidos] = useState(0)

  useEffect(() => {
    getLoggedUserData()
      .then((data) => {
        setGlobalData((prevData) => {
          const newData = {
            ...prevData,
            loggedUser: data,
          };
          return newData; // Retorna el nuevo estado
        });
      })
      .catch((error) => {
        console.error('Error al obtener datos de usuario', error);
      });
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  useEffect(() => {
  }, [globalData]); // Este useEffect se ejecutará cada vez que se actualicen los datos en globalData

  return (
    <AppContext.Provider value={{
      globalData,
      setGlobalData,
      search,
      setSearch,
      numPedidos,
      setNumPedidos
    }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
