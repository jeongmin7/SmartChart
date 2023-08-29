import React, { useState } from "react";
import { styled } from "styled-components";
import Button from "../components/Button";

const HospitalPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Container>
      <Wrapper>
        <Header>병원페이지</Header>
        <TableContainer>
          <Table>
            <tbody>
              <TR>
                <TH>병원명</TH>
                <TD>
                  <input type="text" />
                </TD>
              </TR>
              <TR alternate>
                <TH>주소</TH>
                <TD>
                  <input type="text" />
                </TD>
              </TR>
              <TR>
                <TH>전화번호</TH>
                <TD>
                  <input type="text" />
                </TD>
              </TR>
              <TR alternate>
                <TH>병원소개</TH>
                <TD>
                  <input type="text" />
                </TD>
              </TR>
              <TR>
                <TH>병원사진</TH>
                <TD>
                  <UploadWrapper>
                    {selectedFile && (
                      <ImagePreview
                        src={URL.createObjectURL(selectedFile)}
                        alt="Uploaded"
                      />
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
        </TableContainer>
        <Button width="100px" height="30px" padding="0" fontSize="12px">
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
const TableContainer = styled.div`
  width: 100%;
  min-width: 500px;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TH = styled.th`
  padding: 5px;
  border: 1px solid black;
`;

const TD = styled.td`
  border: 1px solid black;
  padding: 5px;
  text-align: center;
`;
const TR = styled.tr`
  height: 3rem;
  background-color: ${(props) => (props.alternate ? "#E0E3E6" : "white")};
`;

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const FileInput = styled.input`
  margin-left: 20px;
`;

const ImagePreview = styled.img`
  max-width: 100px;
  height: auto;
`;
