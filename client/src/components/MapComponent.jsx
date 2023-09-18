import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { BiCurrentLocation } from "react-icons/bi";
import { styled } from "styled-components";

const { kakao } = window;

const MapComponent = () => {
  const hospitalData = [
    {
      name: "피부과",
      specialty: "피부과",
      lat: 37.5344053,
      lng: 127.1213749,
    },
    {
      name: "안과",
      specialty: "안과",
      lat: 37.5244053,
      lng: 127.1413749,
    },
    {
      name: "이비인후과",
      specialty: "이비인후과",
      lat: 37.4844053,
      lng: 127.1213749,
    },
    {
      name: "치과",
      specialty: "치과",
      lat: 37.4744053,
      lng: 127.1213749,
    },
    {
      name: "정형외과",
      specialty: "정형외과",
      lat: 37.5244053,
      lng: 127.1213749,
    },
    {
      name: "기타",
      specialty: "내과",
      lat: 37.5344053,
      lng: 127.1213749,
    },
  ];

  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}`;
    script.async = true;
    script.onload = initializeMap;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    // 초기 렌더링 시 모든 병원 데이터의 마커 생성
    if (map) {
      createMarkers(hospitalData);
    }
  }, [map]);

  const initializeMap = () => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(0, 0),
      level: 9,
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
          console.error("사용자 위치 가져오기 오류:", error);
          setIsLoading(false);
        },
      );
    }

    setMap(map);
  };

  // 병원 데이터로부터 마커를 생성하고 지도에 표시하는 함수
  const createMarkers = (data) => {
    const newMarkers = data.map((hospital) => {
      const markerPosition = new kakao.maps.LatLng(hospital.lat, hospital.lng);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        map: map,
      });

      // 마커 클릭 이벤트 처리
      kakao.maps.event.addListener(marker, "click", () => {
        openInfoWindow(marker, hospital.name);
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  // InfoWindow 열기
  const openInfoWindow = (marker, content) => {
    // 기존 InfoWindow 닫기
    if (infoWindow) {
      infoWindow.close();
      setInfoWindow(null); // 상태 초기화
    }

    // InfoWindow에 포함될 HTML 요소 생성
    const infoWindowContent = document.createElement("div");
    infoWindowContent.innerHTML = `
      <div>
        <p>${content}</p>
        <button id="infoWindowButton">예약하기</button>
      </div>
    `;

    const button = infoWindowContent.querySelector("#infoWindowButton");
    button.addEventListener("click", handleButtonClick);

    const infowindow = new kakao.maps.InfoWindow({
      content: infoWindowContent, // HTML 문자열 또는 DOM 요소
    });

    infowindow.open(map, marker);
    setInfoWindow(infowindow);
  };

  // InfoWindow 내 버튼 클릭 핸들러
  //  TODO: 여기에 예약하기 누르면 수행할 내역추가
  const handleButtonClick = () => {};

  // 선택된 진료과에 따라 필터링된 병원 데이터를 가져오는 함수
  const getFilteredHospitals = () => {
    if (selectedSpecialty === "") {
      return hospitalData;
    } else {
      return hospitalData.filter(
        (hospital) => hospital.specialty === selectedSpecialty,
      );
    }
  };

  // 지도와 마커 업데이트 함수
  const updateMap = () => {
    const filteredHospitals = getFilteredHospitals();

    // 모든 마커 숨기기
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    // 필터링된 병원 데이터로 새로운 마커 생성 및 지도에 표시
    createMarkers(filteredHospitals);
  };

  useEffect(() => {
    updateMap();
  }, [selectedSpecialty]);

  return (
    <div>
      {isLoading && <Loader />}
      <Options>
        <Option>
          <input
            type="radio"
            value=""
            checked={selectedSpecialty === ""}
            onChange={() => setSelectedSpecialty("")}
          />
          전체
        </Option>
        <Option>
          <input
            type="radio"
            value="내과"
            checked={selectedSpecialty === "내과"}
            onChange={() => setSelectedSpecialty("내과")}
          />
          내과
        </Option>
        <Option>
          <input
            type="radio"
            value="피부과"
            checked={selectedSpecialty === "피부과"}
            onChange={() => setSelectedSpecialty("피부과")}
          />
          피부과
        </Option>
        <Option>
          <input
            type="radio"
            value="안과"
            checked={selectedSpecialty === "안과"}
            onChange={() => setSelectedSpecialty("안과")}
          />
          안과
        </Option>
        <Option>
          <input
            type="radio"
            value="이비인후과"
            checked={selectedSpecialty === "이비인후과"}
            onChange={() => setSelectedSpecialty("이비인후과")}
          />
          이비인후과
        </Option>
      </Options>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
      <button onClick={() => window.location.reload()}>
        <BiCurrentLocation />
      </button>
    </div>
  );
};

export default MapComponent;

const Options = styled.div`
  display: flex;
  flex-direction: row;
`;
const Option = styled.label`
  display: flex;
`;
