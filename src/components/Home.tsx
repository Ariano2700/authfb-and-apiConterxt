import { useAuth } from "../context/authContext";
const Home = () => {
  const { user, logOut, loading } = useAuth();
  const handleLogOut = async () => {
    await logOut();
  };
  // console.log(user);
  if (loading) return <h1>LOADING</h1>;
  return (
    <div className="grid place-content-center">
      <h1 className="text-lg text-[#000]">HOME WAJAJA</h1>
      <h2 className="text-lg text-[#000]">Welcome {user?.email}</h2>
      <button
        className="text-white px-4 py-2 bg-red-500 mt-4 rounded-md"
        onClick={handleLogOut}
      >
        LOGOUT
      </button>
    </div>
  );
};
export default Home;
