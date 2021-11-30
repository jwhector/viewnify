import NavBar from "./components/NavBar";
import LandingPage from "./components/Landing/LandingPage";
import useToken from "./useToken";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <>
        <NavBar showLogin={true} setToken={setToken} />
        <LandingPage setToken={setToken} />
      </>
    );
  }

  return (
    <>
      <NavBar showLogin={false} />
    </>
  )
}

export default App;
