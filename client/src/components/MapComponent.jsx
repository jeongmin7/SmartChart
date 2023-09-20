import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { BiCurrentLocation } from "react-icons/bi";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const { kakao } = window;

const MapComponent = () => {
  const hospitalData = {
    피부과: [
      {
        id: 4,
        hospitalName: "차앤박 피부과",
        hospitalAddress: "서울시 강남구 신사동",
        category: "피부과",
        hospitalPhoneNumber: 1022222222,
        hospitalIntroduce: null,
        hospitalProfileURL: null,
        mapx: "127.0280007",
        mapy: "37.5266292",
      },
      {
        id: 5,
        hospitalName: "연세에스웰 피부과",
        hospitalAddress: "서울특별시 종로구 종로1가 24 404호",
        category: "피부과",
        hospitalPhoneNumber: 1022222222,
        hospitalIntroduce: null,
        hospitalProfileURL: null,
        mapx: "126.9798606",
        mapy: "37.5708345",
      },
    ],
    정형외과: [],
    기타: [],
    안과: [
      {
        id: 6,
        hospitalName: "공 안과 의원",
        hospitalAddress: "서울특별시 종로구 서린동 111-1 인주빌딩4층",
        category: "안과",
        hospitalPhoneNumber: 1022222222,
        hospitalIntroduce: null,
        hospitalProfileURL: null,
        mapx: "126.9797107",
        mapy: "37.5698831",
      },
      {
        id: 7,
        hospitalName: "명동성모 안과 의원",
        hospitalAddress:
          "서울특별시 중구 을지로2가 199-4 (한국전력공사) 별관 3층",
        category: "안과",
        hospitalPhoneNumber: 1022222222,
        hospitalIntroduce: null,
        hospitalProfileURL: null,
        mapx: "126.9833724",
        mapy: "37.5653281",
      },
    ],
    이비인후과: [],
    치과: [],
    내과: [],
  };

  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);
  useEffect(() => {
    if (map) {
      createMarkers(hospitalData);
    }
  }, [map]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}`;
    script.onload = initializeMap;
    document.body.appendChild(script);
  }, []);

  const initializeMap = () => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(0, 0),
      level: 10,
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
    } else {
      console.error("지리적 위치 정보를 사용할 수 없습니다.");
      setIsLoading(false);
    }

    setMap(map);
    createMarkers(hospitalData);
  };

  const createMarkers = (data) => {
    const newMarkers = [];

    for (const specialty in data) {
      const hospitals = data[specialty];
      hospitals.forEach((hospital) => {
        const markerPosition = new kakao.maps.LatLng(
          parseFloat(hospital.mapy),
          parseFloat(hospital.mapx),
        );

        const marker = new kakao.maps.Marker({
          position: markerPosition,
          title: hospital.hospitalName,
          map: map,
        });

        kakao.maps.event.addListener(marker, "click", function () {
          openInfoWindow(marker, hospital);
        });

        newMarkers.push(marker);
      });
    }

    setMarkers(newMarkers);
  };

  const openInfoWindow = (marker, hospital) => {
    const { id, hospitalName } = hospital;
    const infoWindowContent = document.createElement("div");
    infoWindowContent.innerHTML = `
      <div>
        <p>${hospitalName}</p>
        <button id="infoWindowButton">예약하기</button>
      </div>
    `;

    const button = infoWindowContent.querySelector("#infoWindowButton");
    button.addEventListener("click", () => handleButtonClick(id));

    const infowindow = new kakao.maps.InfoWindow({
      content: infoWindowContent,
    });

    infowindow.open(map, marker);
    setInfoWindow(infowindow);
  };

  const handleButtonClick = (id) => {
    navigate(`/appointment/${id}`);
  };

  const getFilteredHospitals = () => {
    if (selectedSpecialty === "") {
      return hospitalData;
    } else {
      const filteredData = {};
      filteredData[selectedSpecialty] = hospitalData[selectedSpecialty];
      return filteredData;
    }
  };
  const updateMap = () => {
    const filteredHospitals = getFilteredHospitals();

    markers.forEach((marker) => {
      marker.setMap(null);
    });

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
  padding: 2rem;
  justify-content: space-between;
`;

const Option = styled.label`
  display: flex;
`;
