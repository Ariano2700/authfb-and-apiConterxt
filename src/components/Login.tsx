import { Link } from "react-router-dom";
import InputForm from "./login-components/InputForm";
import SolarLockOutline from "../assets/icons/solar/SolarLockOutline";
import SolarUserOutline from "../assets/icons/solar/SolarUserOutline";
import { useState } from "react";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="max-w-md bg-emerald-400 rounded-md">
      <form className="flex flex-col items-center gap-6 p-3 h-full w-full">
        <h1 className="text-p600 font-semibold text-lg md:text-2xl">
          Iniciar sesión
        </h1>

        <InputForm
          placeholder="Email"
          type="email"
          name="email"
          icon={<SolarUserOutline />}
        />

        <div className="w-full flex flex-col items-end gap-1">
          <InputForm
            placeholder="Contraseña"
            type="password"
            name="password"
            icon={<SolarLockOutline />}
          />

          <Link
            className="text-sm text-p500 hover:underline"
            to="/restablecer-clave"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button className="btn btn-primary" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
};
export default Login;
