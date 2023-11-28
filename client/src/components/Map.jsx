import React, { useEffect } from "react";
import { toast } from "react-toastify";
const { kakao } = window;

const Map = ({ setMap, setIsLoading }) => {
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
      center: new kakao.maps.LatLng(0, 0),
      level: 7,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = new kakao.maps.LatLng(latitude, longitude);
          map.setCenter(userLocation);

          setIsLoading(false);
        },
        (error) => {
          toast.error("사용자 위치 가져오는데 실패했습니다.");
          setIsLoading(false);
        }
      );
    } else {
      toast.error("지리적 위치 정보를 사용할 수 없습니다.");
      setIsLoading(false);
    }

    setMap(map);
  };

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default Map;
