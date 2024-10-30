// navigationContext.js
import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState("Home");

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setCurrentScreen("Home"); // Adjust this for more complex back navigation
  };

  return (
    <NavigationContext.Provider
      value={{ currentScreen, navigate: navigateTo, goBack }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
