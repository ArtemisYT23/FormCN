import { AppRoute } from "./routes";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <AppRoute />
    </AuthContextProvider>
  );
}

export default App;
