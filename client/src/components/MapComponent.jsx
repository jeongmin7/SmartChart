import React, { useEffect } from "react";
const { kakao } = window;

const MapComponent = () => {
  useEffect(() => {
    // 카카오 맵 API 스크립트 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}`;
    script.onload = initializeMap;
    document.body.appendChild(script);
  }, []);

  const initializeMap = () => {
    // 마커 생성
    const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    // 지도 생성
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      // 여기가 검색된 영역?
      level: 3,
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);

    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="width:150px;text-align:center;padding:6px 0;"></div>`,
    });
    infowindow.open(map, marker);

    // 지도와 마커를 컴포넌트의 상태로 관리하거나 다른 함수에서 접근할 수 있도록 설정할 수도 있습니다.
    // this.setState({ map, marker });
  };

  return (
    <div>
      {/* 지도가 표시될 div */}
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default MapComponent;
