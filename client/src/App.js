import Navigation from "./navigation";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Navigation />
    </AuthProvider>
  );
}

export default App;
