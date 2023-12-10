import { ReactNode } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute(props: ProtectedRouteProps) {
  const { children } = props;
  const { user, loading } = useAuth();
  if (loading) return <h1>loading</h1>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

export function LoginRedirectIfAuthenticated() {
  const { user, loading } = useAuth();
  if (loading) return <h1>loading</h1>;
  if (user) return <Navigate to="/" />;
  return <Login />;
}

export function RegisterRedirectIfAuthenticated() {
  const { user, loading } = useAuth();
  if (loading) return <h1>loading</h1>;
  // Redirige a la página principal si el usuario ya está autenticado
  if (user) return <Navigate to="/" />;
  return <Register />;
}
