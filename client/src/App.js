import Navbar from "./layout/Navbar";
import RoutesCollection from "./routesCollection";
import Routes from "./routesCollection";
import GlobalStyles from "./styles/GlobalStyles";
function App() {
  return (
    <>
      <Navbar />
      <GlobalStyles />
      <Routes>
        <RoutesCollection />
      </Routes>
    </>
  );
}

export default App;
