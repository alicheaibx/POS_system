// Navigation.js
import React from "react";
import { useNavigation } from "./navigationContext";
import Login from "./screens/login";
import Signup from "./screens/signUp";
import Home from "./screens/home"; // Ensure this path is correct
import GetStarted from "./screens/getStarted";
import StartPOSScreen from "./screens/startPOS";

import AddSizeScreen from "./screens/addSize";
import AddCategoryScreen from "./screens/addCategory";
import AddMaterialSizeScreen from "./screens/addMaterial";

const Navigation = () => {
  const { currentScreen } = useNavigation();

  return (
    <>
      {currentScreen === "Home" && <Home />}
      {currentScreen === "Login" && <Login />}
      {currentScreen === "Signup" && <Signup />}
      {currentScreen === "GetStarted" && <GetStarted />}
      {currentScreen === "StartPOSScreen" && <StartPOSScreen />}
      {currentScreen === "AddCategory" && <AddCategoryScreen />}
      {currentScreen === "AddSize" && <AddSizeScreen />}
      {currentScreen === "AddMaterial" && <AddMaterialSizeScreen />}
    </>
  );
};

export default Navigation;
