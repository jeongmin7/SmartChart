import React, { useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const { kakao } = window;

const MapComponent = ({ setIsLoading }) => {
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
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [markers, setMarkers] = useState([]);

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
      level: 8,
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

    const content = `
    <div style="padding: 10px; background-color: #fff; border: 1px solid #ccc;">
      <p style="font-weight: bold; margin-bottom: 5px;">${hospitalName}</p>
      <p style="font-size: 12px">${hospital.hospitalAddress}</p>
      <button id="infoWindowButton" style="background-color: #1798e1; color: #fff; border: none; padding: 5px 10px; cursor: pointer; margin-top: 5px;">예약하기</button>
    </div>`;
    // 커스텀 오버레이가 표시될 위치입니다
    var position = new kakao.maps.LatLng(hospital.mapy, hospital.mapx);
    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
      position: position,
      content: content,
      xAnchor: 0.3,
      yAnchor: 0.91,
    });

    // 커스텀 오버레이를 지도에 표시합니다
    customOverlay.setMap(map);
    const button = document.getElementById("infoWindowButton");
    button.addEventListener("click", () => handleButtonClick(id));
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
    <Container>
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
        <Option>
          <input
            type="radio"
            value="치과"
            checked={selectedSpecialty === "치과"}
            onChange={() => setSelectedSpecialty("치과")}
          />
          치과
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
      </Options>
      <div id="map" style={{ width: "600px", height: "500px" }}></div>
      <button onClick={() => window.location.reload()}>
        <BiCurrentLocation />
      </button>
    </Container>
  );
};

export default MapComponent;

const Container = styled.div`
  padding: 3rem;
  width: 80%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Options = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0rem 1.5rem 1.5rem;
  justify-content: space-between;
  width: 100%;
`;

const Option = styled.label`
  display: flex;
`;
