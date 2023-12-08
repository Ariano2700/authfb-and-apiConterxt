import { ReactNode, createContext, useContext } from "react";
import { Auth } from "../types/authType";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth as authFirebase } from "../firebase/firebaseConfig";

type SingUpFunction = (auth: Auth) => void;

type AuthProviderProps = {
  children: ReactNode;
};
const authContext = createContext<SingUpFunction | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const singUp: SingUpFunction = async (auth) => {
    const { email, password } = auth;
    try {
      await createUserWithEmailAndPassword(authFirebase, email, password);
    } catch (error:any) {
      throw new Error(error.message || "Error desconocido");
    }
  };
  return <authContext.Provider value={singUp}>{children}</authContext.Provider>;
}
