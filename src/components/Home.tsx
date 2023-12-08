import { useAuth } from "../context/authContext";
const Home = () => {
  const {login} = useAuth();
  console.log(login)
  return <h1 className="text-lg text-[#000]">HOME WAJAJA</h1>;
};
export default Home;
