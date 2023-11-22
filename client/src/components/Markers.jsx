import React, { useCallback, useEffect, useState } from "react";

const Markers = ({ map, setCurrentHospital, filteredHospitals }) => {
  const [markers, setMarkers] = useState([]);
  function addDecimalToString(stringValue) {
    // 문자열의 앞부분과 뒷부분을 나누어 소수점을 추가
    const integerPart = stringValue.slice(0, -7); // 소수점 앞부분
    const decimalPart = stringValue.slice(-7); // 소수점 뒷부분
    return `${integerPart}.${decimalPart}`;
  }
  const loadKakaoMarkers = useCallback(() => {
    const newMarkers = [];
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    if (map) {
      filteredHospitals.map((hospital) => {
        const markerPosition = new window.kakao.maps.LatLng(
          addDecimalToString(hospital.mapy),
          addDecimalToString(hospital.mapx)
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map); // 마커커서가 오버되었을 때 마커 위에 인포윈도우 표시
        var content = `<div style="padding: 10px; background-color: #fff; border-radius: 5px">${hospital.hospitalName}</div>`;

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchore: 0.6,
          yAnchore: 0.91,
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          customOverlay.setMap(map);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          customOverlay.setMap(null);
        });
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentHospital(hospital);
        });
        newMarkers.push(marker);
      });
    }
    setMarkers(newMarkers);
  }, [map, setCurrentHospital, filteredHospitals]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);
  return <></>;
};

export default Markers;
