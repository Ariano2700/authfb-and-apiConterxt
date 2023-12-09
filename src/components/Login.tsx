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
  const { login } = useAuth();
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
        setError("El correo o la contraseña son incorrectos" || "Error desconocido");
        setShowErrorDialog(true);
        console.log(error);
      }
    }
  };

  const handleChange: handleChangeType = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    setError(null); // Limpiar el error al cambiar el contenido del campo
  };
  return (
    <div className="max-w-md bg-emerald-400 rounded-md">
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
    </div>
  );
};
export default Login;
