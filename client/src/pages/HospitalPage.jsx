import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Button from "../components/Button";
import { palette } from "../styles/GlobalStyles";
import axios from "axios";
import { toast } from "react-toastify";

const HospitalPage = () => {
  const [hospitalInfo, setHospitalInfo] = useState({
    hospitalName: "",
    hospitalPhoneNumber: "",
    hospitalIntroduce: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/doctor/hospital-view", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setHospitalInfo(response.data.hospitalPage[0]);
    };
    fetchData();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;

    setHospitalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      await axios.patch("/doctor/hospital", {
        hospitalName: hospitalInfo.hospitalName,
        hospitalPhoneNumber: hospitalInfo.hospitalPhoneNumber,
        hospitalIntroduction: hospitalInfo.hospitalIntroduce,
      });
      toast.success("성공적으로 업데이트 되었습니다.");
      window.location.reload();
    } catch (error) {
      toast.error("에러가 발생하였습니다.");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Header>병원페이지</Header>
        <Table>
          <tbody>
            <TR>
              <TH>병원명</TH>
              <TD>
                <Input
                  type="text"
                  name="hospitalName"
                  onChange={onChange}
                  value={hospitalInfo && hospitalInfo.hospitalName}
                  readOnly={false}
                />
              </TD>
            </TR>

            <TR alternate>
              <TH>전화번호</TH>
              <TD>
                <Input
                  alternate
                  type="text"
                  name="hospitalPhoneNumber"
                  onChange={onChange}
                  value={hospitalInfo && hospitalInfo.hospitalPhoneNumber}
                />
              </TD>
            </TR>
            <TR>
              <TH>병원소개</TH>
              <TD>
                <Textarea
                  type="text"
                  name="hospitalIntroduce"
                  onChange={onChange}
                  value={
                    hospitalInfo && hospitalInfo.hospitalIntroduce === null
                      ? "클릭하여 병원 소개를 입력해주세요"
                      : hospitalInfo.hospitalIntroduce
                  }
                />
              </TD>
            </TR>
          </tbody>
        </Table>
        <Button
          width="100px"
          height="30px"
          padding="0"
          fontSize="12px"
          onClick={handleSubmit}
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
  width: 400px;
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
  background-color: ${(props) => (props.alternate ? "#E0E3E6" : "white")};
  border: none;
`;

const Textarea = styled.textarea`
  width: 100%;
  line-height: 3;
  border: none;
`;
const Nothing = styled.div`
  width: 100px;
  height: 100px;
  padding: 20px;
  border: 1px solid ${palette.gray.border};
`;
