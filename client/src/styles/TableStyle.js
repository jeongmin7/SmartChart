import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  margin-top: 20px;
`;

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeader = styled(TableRow)`
  font-weight: bold;
  background-color: #f0f0f0;
  display: flex;
  padding: 8px;
`;

export const TableCell = styled.div`
  flex: ${(props) => (props.id ? "0 0 45px" : "1")};
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;
`;
