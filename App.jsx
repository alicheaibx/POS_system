import React from "react";
import Navigation from "./navigation";
import { NavigationProvider } from "./navigationContext";
import { DatabaseProvider } from "./databaseContext"; // Adjust the path accordingly

const App = () => {
  return (
    <DatabaseProvider>
      <NavigationProvider>
        <Navigation />
      </NavigationProvider>
    </DatabaseProvider>
  );
};

export default App;
