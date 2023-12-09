import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Auth } from "../types/authType";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth as authFirebase } from "../firebase/firebaseConfig";

type LogOutFunction = () => void;

type SingUpAndLoginFunction = {
  singUp: (auth: Auth) => void;
  login: (auth: Auth) => void;
  user: FirebaseUser | null;
  logOut: LogOutFunction;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};
const authContext = createContext<SingUpAndLoginFunction | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const [loading, setLoading] = useState<SingUpAndLoginFunction['loading']>(true);

  const singUp: SingUpAndLoginFunction["singUp"] = async (auth) => {
    const { email, password } = auth;
    try {
      await createUserWithEmailAndPassword(authFirebase, email, password);
    } catch (error: any) {
      throw new Error(error.message || "Error desconocido");
    }
  };
  const login: SingUpAndLoginFunction["login"] = async (auth) => {
    const { email, password } = auth;
    try {
      await signInWithEmailAndPassword(authFirebase, email, password);
    } catch (error: any) {
      throw new Error(error.message || "Error desconocido");
    }
  };
  const logOut: LogOutFunction = () => {
    signOut(authFirebase);
  };
  useEffect(() => {
    onAuthStateChanged(authFirebase, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);
  return (
    <authContext.Provider value={{ singUp, login, user, logOut, loading}}>
      {children}
    </authContext.Provider>
  );
}
