import Navigation from "./navigation";
import HeaderCtrl from "./controllers/Header/HeaderCtrl";
import { useAuth } from "./context/AuthContext";

function App() {
  const authContext = useAuth();
  const { isAuthenticated } = authContext;
  return (
    <>
      {isAuthenticated && <HeaderCtrl />}
      <Navigation />
    </>
  );
}

export default App;
