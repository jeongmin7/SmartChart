import axios from "axios";
import React, { useEffect } from "react";

const KakaoAuth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  console.log("code", code);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/auth/kakao/callback", code);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   fetch("/auth/kakao/callback", {
  //     method: "POST",
  //     body: { code },
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded;",
  //     },
  //   });
  // }, []);

  return <div>KakaoAuth</div>;
};

export default KakaoAuth;
