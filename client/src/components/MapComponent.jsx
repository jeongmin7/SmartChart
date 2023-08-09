import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { BiCurrentLocation } from "react-icons/bi";

const { kakao } = window;

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState({
    lat: 37.5658091,
    lng: 126.9729574,
  });
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 사용자 위치 가져오기
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting user location:", error);
          },
        );
      } else {
        console.error("Geolocation is not available.");
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    // 카카오 맵 API 스크립트 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}`;
    script.onload = initializeMap;
    document.body.appendChild(script);
  }, []);

  const initializeMap = () => {
    const markerPosition = new kakao.maps.LatLng(
      userLocation.lat,
      userLocation.lng,
    );

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: markerPosition, // 사용자의 위치로 지도 중심 설정
      level: 7,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    marker.setMap(map);
    setMap(map);
  };

  const moveToUserLocation = () => {
    if (map && userLocation.lat && userLocation.lng) {
      setIsLoading(true);
      const newCenter = new kakao.maps.LatLng(
        userLocation.lat,
        userLocation.lng,
      );

      map.panTo(newCenter);
      setTimeout(() => {
        setIsLoading(false); // 로딩 상태 종료 (이동 완료 후)
      }, 1000); //
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
      <button onClick={moveToUserLocation}>
        <BiCurrentLocation />
      </button>
    </div>
  );
};

export default MapComponent;
