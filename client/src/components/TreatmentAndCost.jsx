import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { palette } from "../styles/GlobalStyles";

const TreatmentAndCost = () => {
  const [inputData, setInputData] = useState({ treatment: "", cost: "" });
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleAdd = () => {
    if (inputData.treatment !== "" && inputData.cost !== "") {
      setData([...data, inputData]);
      setInputData({ treatment: "", cost: "" });
    }
  };

  return (
    <div>
      <InputContainer>
        <Input
          type="text"
          placeholder="치료 항목"
          name="treatment"
          value={inputData.treatment}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="비용"
          name="cost"
          value={inputData.cost}
          onChange={handleChange}
        />
        <Button
          border="none"
          padding=" 5px 10px"
          borderRadius="5px"
          onClick={handleAdd}
        >
          추가
        </Button>
      </InputContainer>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>치료 항목</TableHeader>
              <TableHeader>비용</TableHeader>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <TableCell>데이터를 추가해주세요.</TableCell>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <TableCell>{item.treatment}</TableCell>
                  <TableCell>{item.cost}원</TableCell>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <ButtonContainer>
          <Button borderRadius="5px" marginBottom="10px" width="30%">
            저장
          </Button>
        </ButtonContainer>
      </TableContainer>
    </div>
  );
};

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 20px;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: 10px;
`;

const TableHeader = styled.th`
  background-color: ${palette.gray.light};
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px 20px;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default TreatmentAndCost;
