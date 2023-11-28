import axios from "axios";
import React, { useEffect } from "react";

const KakaoAuth = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/kakao/callback",
          { code }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [code]);

  return <div>KakaoAuth</div>;
};

export default KakaoAuth;
