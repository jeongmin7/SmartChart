import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";
const { kakao } = window;

const Map = ({ setMap, setIsLoading, isLoading }) => {
  const [isMyLocationLoading, setIsMyLocationLoading] = useState(false);
  const loadKakaoMapScript = () => {
    if (!window.kakao) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
      script.async = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else {
      initializeMap();
    }
  };

  useEffect(() => {
    loadKakaoMapScript();
  }, []);

  const initializeMap = () => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 7,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    setIsLoading(false);

    setMap(map);

    // 내 위치 찾기 버튼
    const geolocationButton = document.createElement("button");
    geolocationButton.textContent = "내 위치 찾기";
    mapContainer.appendChild(geolocationButton);

    geolocationButton.style.position = "absolute";
    geolocationButton.style.top = "10px";
    geolocationButton.style.left = "10px";
    geolocationButton.style.zIndex = "1";

    geolocationButton.addEventListener("click", () => {
      setIsMyLocationLoading(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = new kakao.maps.LatLng(latitude, longitude);
            map.setCenter(userLocation);
            setIsMyLocationLoading(false);
          },
          (error) => {
            toast.error("사용자 위치 가져오는데 실패했습니다.");
            setIsMyLocationLoading(false);
          }
        );
      } else {
        toast.error("지리적 위치 정보를 사용할 수 없습니다.");
        setIsMyLocationLoading(false);
      }
    });
  };

  return (
    <div
      id="map"
      style={{ width: "100%", height: "700px", position: "relative" }}
    >
      {isMyLocationLoading && <Loader />}
      {isLoading && <Loader />}
    </div>
  );
};

export default Map;
