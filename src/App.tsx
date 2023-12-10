import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute,LoginRedirectIfAuthenticated, RegisterRedirectIfAuthenticated } from "./components/ProtectedRoute";
function App() {
  return (
    <div className="bg-slate-400 h-screen">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginRedirectIfAuthenticated />} />
          <Route path="/register" element={<RegisterRedirectIfAuthenticated />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
