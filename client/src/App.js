import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import CPanel from "./Pages/CPanel/CPanel";
import PrivateRoute from "./components/PrivateRoute";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/cpanel" element={<CPanel />} />
        </Route>

        {/* Opcional: ruta por defecto */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;