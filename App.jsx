import Navigation from "./navigation";
import { NavigationProvider } from "./navigationContext";

const App = ({ navigation }) => {
  return (
    <NavigationProvider>
      <Navigation />
    </NavigationProvider>
  );
};

export default App;
