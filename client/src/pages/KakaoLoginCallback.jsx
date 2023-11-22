import React, { useEffect } from "react";
import instance from "../components/api";
import axios from "axios";

const KakaoLoginCallback = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);

    if (code) {
      axios.post("localhost:8080/auth/kakao/callback", { code });
    } else {
      console.error("Invalid code");
    }
  }, []);
  return <div>KakaoLoginCallback</div>;
};

export default KakaoLoginCallback;
