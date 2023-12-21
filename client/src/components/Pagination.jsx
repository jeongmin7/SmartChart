import styled from "styled-components";

const Pagination = ({ children }) => {
  return <PaginationContainer>{children}</PaginationContainer>;
};
export default Pagination;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 50px;
`;
