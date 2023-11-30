import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoAuth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/kakao/callback",
          { code }
        );
        console.log(response);
        navigate("/mypage");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [code]);

  return <div>KakaoAuth</div>;
};

export default KakaoAuth;
