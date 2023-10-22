import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Button from "../components/Button";
import { palette } from "../styles/GlobalStyles";
import { useDaumPostcodePopup } from "react-daum-postcode";
import instance from "../components/api";

const HospitalPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [fullAddress, setFullAddress] = useState("");
  // const [getAddress, setGetAddress] = useState(false);
  const [hospitalInfo, setHospitalInfo] = useState([]);
  const [newInfo, setNewInfo] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await instance.get("/doctor/page-view", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log(response);
  //   };
  //   fetchData();
  // }, []);
  const addressModalopen = useDaumPostcodePopup();

  const searchAddress = (data) => {
    setNewInfo((prev) => ({
      ...prev,
      buildingName: data.buildingName,
      postalCode: data.zonecode,
      address: data.address,
    }));
  };
  const handleClick = () => {
    addressModalopen({ onComplete: searchAddress });
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setNewInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    console.log(newInfo);
  };

  // console.log(hospitalInfo, "111");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // const handleAddressClick = () => {
  //   // 주소 입력창을 토글 (클릭할 때마다 상태를 반전)
  //   setGetAddress((prev) => !prev);
  // }
  // const handleComplete = (data) => {
  //   let fullAddress = data.address;
  //   let extraAddress = "";

  //   if (data.addressType === "R") {
  //     if (data.bname !== "") {
  //       extraAddress += data.bname;
  //     }
  //     if (data.buildingName !== "") {
  //       extraAddress +=
  //         extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
  //     }
  //     fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  //     setFullAddress(fullAddress);
  //   }
  // };

  return (
    <Container>
      <Wrapper>
        <Header>병원페이지</Header>
        <Table>
          <tbody>
            <TR>
              <TH>병원명</TH>
              <TD>
                <Input type="text" name="name" onChange={onChange} />
              </TD>
            </TR>
            <TR alternate="true">
              <TH>주소</TH>

              <TD>
                <Input
                  type="text"
                  value={newInfo.address}
                  onClick={handleClick}
                />
                {/* {getAddress && (
                  <div>
                    <DaumPostcodeEmbed
                      onComplete={handleComplete}
                      height={700}
                    />
                  </div>
                )} */}
              </TD>
            </TR>
            <TR>
              <TH>전화번호</TH>
              <TD>
                <Input type="text" name="tel" onChange={onChange} />
              </TD>
            </TR>
            {/* <TR alternate>
              <TH>병원소개</TH>
              <TD>
                <Textarea type="text" name="tel" onChange={onChange} />
              </TD>
            </TR> */}
            <TR>
              <TH>병원사진</TH>
              <TD>
                <UploadWrapper>
                  {selectedFile ? (
                    <ImagePreview
                      src={URL.createObjectURL(selectedFile)}
                      alt="Uploaded"
                    />
                  ) : (
                    <Nothing>No image</Nothing>
                  )}
                  <FileInput
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </UploadWrapper>
              </TD>
            </TR>
          </tbody>
        </Table>
        <Button
          width="100px"
          height="30px"
          padding="0"
          fontSize="12px"
          onChange={handleSubmit}
        >
          업데이트
        </Button>
      </Wrapper>
    </Container>
  );
};

export default HospitalPage;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 900px;
  min-height: calc(100vh - 100px);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  padding: 100px 200px 100px;
  border-radius: 20px;
`;
const Header = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 25px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 300px;
  margin-bottom: 15px;
`;

const TH = styled.th`
  padding: 5px;
  border: 1px solid black;
  text-align: center;
  vertical-align: middle; /* 수직 가운데 정렬 */
`;

const TD = styled.td`
  border: 1px solid black;
  padding: 10px;
  text-align: center;
`;
const TR = styled.tr`
  height: 3rem;
  background-color: ${(props) => (props.alternate ? "#E0E3E6" : "white")};
`;

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const FileInput = styled.input`
  margin-left: 20px;
`;

const ImagePreview = styled.img`
  max-width: 220px;
  height: auto;
`;

const Input = styled.input`
  width: 100%;
  line-height: 2;
  padding: 0;
  font-size: 15px;
`;

const Textarea = styled.textarea`
  width: 100%;
  line-height: 3;
`;
const Nothing = styled.div`
  width: 100px;
  height: 100px;
  padding: 20px;
  border: 1px solid ${palette.gray.border};
`;
