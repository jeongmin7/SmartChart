import React, { useState } from "react";
import WeeklyChart from "../components/chart/WeeklyChart";
import YearlyChart from "../components/chart/YearlyChart";
import DailyChart from "../components/chart/DailyChart";
import MonthlyChart from "../components/chart/MonthlyChart";
import SalesTable from "../components/SalesTable";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import PeriodChart from "../components/chart/PeriodChart";
import AverageAgeChart from "../components/chart/AverageAgeChart";
import SalesChart from "../components/chart/SalesChart";

const Accounting = () => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [duration, setDuration] = useState({
    startDate: "",
    endDate: "",
  });
  console.log(duration);
  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setDuration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChartSelection = (chartType) => {
    switch (chartType) {
      case "주간 매출":
        setSelectedChart(<WeeklyChart />);
        break;
      case "연 매출":
        setSelectedChart(<YearlyChart />);
        break;
      case "일 매출":
        setSelectedChart(<DailyChart />);
        break;
      case "월별 매출":
        setSelectedChart(<MonthlyChart />);
        break;
      case "월별 방문자 성별":
        setSelectedChart(<MonthlyChart />);
        break;
      case "월별 평균나이":
        setSelectedChart(<AverageAgeChart />);
        break;
      case "최신순":
        setSelectedChart(<MonthlyChart />);
        break;
      case "매출순":
        setSelectedChart(<SalesChart />);
        break;
      case "기간별":
        setSelectedChart(<PeriodChart />);
        break;
      default:
        setSelectedChart(null);
    }
  };
  return (
    <Container>
      <Header>매출관리</Header>
      <Buttons>
        <Button onClick={() => handleChartSelection("월별 매출")}>
          월별 매출
        </Button>
        <Button onClick={() => handleChartSelection("주간 매출")}>
          주간 매출
        </Button>
        <Button onClick={() => handleChartSelection("연 매출")}>연 매출</Button>
        <Button onClick={() => handleChartSelection("일 매출")}>일 매출</Button>
        <Button onClick={() => handleChartSelection("월별 방문자 성별")}>
          월별 방문자 성별
        </Button>
        <Button onClick={() => handleChartSelection("월별 평균나이")}>
          월별 평균나이
        </Button>
        <Button onClick={() => handleChartSelection("최신순")}>최신순</Button>
        <Button onClick={() => handleChartSelection("매출순")}>매출순</Button>
        <input
          type="date"
          name="startDate"
          value={duration.startDate}
          onChange={handleDateChange}
        />
        ~
        <input
          type="date"
          name="endDate"
          value={duration.endDate}
          onChange={handleDateChange}
        />
        <Button onClick={() => handleChartSelection("기간별")}>검색</Button>
      </Buttons>
      {selectedChart}
      <SalesTable />
    </Container>
  );
};

export default Accounting;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh-100px);
`;

const Header = styled.div`
  font-weight: bold;
  margin: 100px 0px 40px 0px;
  font-size: 25px;
`;
const Buttons = styled.div`
  display: grid;
  width: 60%;
  padding: 2rem;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;
const Button = styled.button`
  background-color: #1798e1;
  border: none;
  padding: 0.5rem 1rem;
  color: ${palette.white};
  font-weight: 700;
`;
