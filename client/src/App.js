import { useEffect } from "react";
import Navbar from "./layout/Navbar";
import RoutesCollection from "./routesCollection";
import { sizeStore } from "./stores/sizeStore";
import { useSetRecoilState } from "recoil";
import { GlobalStyle } from "./styles/GlobalStyles";
import ChatIcon from "./assets/ChatIcon";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  // const isToggle = useRecoilValue(sizeStore);
  const setSizeStore = useSetRecoilState(sizeStore);
  useEffect(() => {
    function handleResize() {
      setSizeStore({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <ChatIcon />
      <GlobalStyle />
      <RoutesCollection />
    </>
  );
}

export default App;
