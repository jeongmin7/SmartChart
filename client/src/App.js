import { useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import RoutesCollection from "./routesCollection";
import Routes from "./routesCollection";
import { useRecoilValue } from "recoil";
import { sizeStore } from "./stores/sizeStore";
import { useSetRecoilState } from "recoil";
import { GlobalStyle } from "./styles/GlobalStyles";

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
      <Navbar />
      <GlobalStyle />
      <Routes>
        <RoutesCollection />
      </Routes>
    </>
  );
}

export default App;
