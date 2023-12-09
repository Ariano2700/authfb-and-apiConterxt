import { ChangeEvent, FormEvent, useState } from "react";
import SolarLockOutline from "../assets/icons/solar/SolarLockOutline";
import SolarUserOutline from "../assets/icons/solar/SolarUserOutline";
import InputForm from "./login-components/InputForm";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "./ErrorAlert";

type handleChangeType = (e: ChangeEvent<HTMLInputElement>) => void;
type handleSubmitType = (e: FormEvent<HTMLFormElement>) => void;

const Register = () => {
  const {singUp} = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const handleChange: handleChangeType = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    setError(null); // Limpiar el error al cambiar el contenido del campo
  };
  const handleSubmit: handleSubmitType = async (e) => {
    e.preventDefault();
    try {
      await singUp({ email: user.email, password: user.password });
      navigate("/");
    } catch (error: any) {
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError("Correo electrónico no válido" || "Error desconocido");
        setShowErrorDialog(true);
        console.log(error.message);
      }
      if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError(
          "La contraseña debe tener minimo 6 caracteres" || "Error desconocido"
        );
        setShowErrorDialog(true);
        console.log(error.message);
      }
      if (error.message === "Firebase: Error(auth/email-already-in-use).") {
        setError(
          "El correo ya esta en uso, coloque otro correo" || "Error desconocido"
        );
        setShowErrorDialog(true);
        console.log(error.message);
      }
    }
  };
  return (
    <div className="max-w-md bg-blue-400 rounded-md">
      {showErrorDialog && ErrorAlert({error})}
      <form
        className="flex flex-col items-center gap-6 p-3 h-full w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-p600 font-semibold text-lg md:text-2xl">
          Registrar
        </h1>
        <InputForm
          placeholder="Email"
          type="email"
          name="email"
          icon={<SolarUserOutline />}
          onChange={handleChange}
        />
        <InputForm
          placeholder="Contraseña"
          type="password"
          name="password"
          icon={<SolarLockOutline />}
          onChange={handleChange}
        />
        {/* <InputForm
          placeholder="Repetir contraseña"
          type="password"
          name="password"
          icon={<SolarLockOutline />}
          onChange={handleChange}
        /> */}
        <button
          className="btn bg-green-950 px-7 py-2 text-white rounded-md"
          type="submit"
        >
          Registar
        </button>
      </form>
    </div>
  );
};
export default Register;
