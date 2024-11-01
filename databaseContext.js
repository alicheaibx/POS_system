import React, { createContext, useContext, useEffect, useState } from "react";
import Datastore from "react-native-local-mongodb";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initializeDB = async () => {
      try {
        // Create a new instance of the database with the correct storage option
        const database = new Datastore({
          filename: "userDatabase",
          autoload: true,
          storage: AsyncStorage, // Ensure AsyncStorage is passed correctly
        });

        database.loadDatabase((error) => {
          if (error) {
            console.error("Error loading database:", error);
          } else {
            console.log("Database loaded successfully");
            setDb(database);
            setDbInitialized(true);

            // Ensure the 'users' collection structure is available (optional)
            database.ensureIndex({ fieldName: "id", unique: true }, (err) => {
              if (err) {
                console.error("Error creating index:", err);
              } else {
                console.log("Index created successfully");
              }
            });
          }
        });
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initializeDB();
  }, []);

  return (
    <DatabaseContext.Provider value={{ db, dbInitialized }}>
      {children}
    </DatabaseContext.Provider>
  );
};
