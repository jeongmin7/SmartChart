import { useEffect } from "react";
import Navbar from "./layout/Navbar";
import RoutesCollection from "./routesCollection";
import { sizeStore } from "./stores/sizeStore";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GlobalStyle } from "./styles/GlobalStyles";
import ChatIcon from "./assets/ChatIcon";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { userRoleAtom } from "./stores/userInfo";

function App() {
  const navigate = useNavigate();
  const setSizeStore = useSetRecoilState(sizeStore);
  const userRole = useRecoilValue(userRoleAtom);

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
      if (window.location.pathname !== "/signup") {
        navigate("/");
      }
    }
  }, [navigate, userRole]);

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
