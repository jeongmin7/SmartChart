import { useEffect } from "react";
import Navbar from "./layout/Navbar";
import RoutesCollection from "./routesCollection";
import { sizeStore } from "./stores/sizeStore";
import { useSetRecoilState } from "recoil";
import { GlobalStyle } from "./styles/GlobalStyles";
import ChatIcon from "./assets/ChatIcon";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
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

  useEffect(() => {
    const session = document.cookie.includes("session");
    const token = document.cookie.includes("token");

    if (!session && !token) {
      navigate("/");
    } else if (!session) {
      navigate("/mypage");
    } else if (!token) {
      navigate("/hospitalpage");
    }
  }, [navigate]);

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
