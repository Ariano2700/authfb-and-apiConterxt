import { Link } from "react-router-dom";
import InputForm from "./login-components/InputForm";
import SolarLockOutline from "../assets/icons/solar/SolarLockOutline";
import SolarUserOutline from "../assets/icons/solar/SolarUserOutline";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ErrorAlert } from "./ErrorAlert";

type handleChangeType = (e: ChangeEvent<HTMLInputElement>) => void;
type handleSubmitType = (e: FormEvent<HTMLFormElement>) => void;

const Login = () => {
  const { login, loginWhitGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit: handleSubmitType = async (e) => {
    e.preventDefault();
    try {
      await login({ email: user.email, password: user.password });
      navigate("/");
    } catch (error: any) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        setError(
          "El correo o la contraseña son incorrectos" || "Error desconocido"
        );
        setShowErrorDialog(true);
        console.log(error);
      }
    }
  };

  const handleChange: handleChangeType = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    setError(null); // Limpiar el error al cambiar el contenido del campo
  };
  const handleGoogleSingIn = async () => {
    await loginWhitGoogle();
    navigate('/')
  };
  return (
    <div className="max-w-md bg-emerald-400 rounded-md">
      <div className="p-4">
        {showErrorDialog && ErrorAlert({ error })}
        <form
          className="flex flex-col items-center gap-6 p-3 h-full w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="text-p600 font-semibold text-lg md:text-2xl">
            Iniciar sesión
          </h1>

          <InputForm
            placeholder="Email"
            type="email"
            name="email"
            icon={<SolarUserOutline />}
            onChange={handleChange}
          />

          <div className="w-full flex flex-col items-end gap-1">
            <InputForm
              placeholder="Contraseña"
              type="password"
              name="password"
              icon={<SolarLockOutline />}
              onChange={handleChange}
            />

            <Link
              className="text-sm text-p500 hover:underline"
              to="/restablecer-clave"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            className="btn bg-green-950 px-7 py-2 text-white rounded-md"
            type="submit"
          >
            Ingresar
          </button>
        </form>
        <div className="flex items-center justify-center">
          <button
            className="signin flex items-center gap-2 max-w-[320px] p-2 text-sm font-semibold text-center text-black border border-solid border-white rounded-md bg-[#fff] cursor-pointer transition-transform duration-250 ease-in-out hover:scale-105 active:scale-95"
            onClick={handleGoogleSingIn}
          >
            <svg
              className="h-6 w-auto"
              viewBox="0 0 256 262"
              preserveAspectRatio="xMidYMid"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              ></path>
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              ></path>
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              ></path>
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              ></path>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
