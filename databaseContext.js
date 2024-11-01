// DatabaseContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { initDB } from "./database"; // Adjust the path accordingly

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await initDB();
        setDbInitialized(true);
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initializeDatabase();
  }, []);

  return (
    <DatabaseContext.Provider value={{ dbInitialized }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  return useContext(DatabaseContext);
};
