import React, { useEffect, useState } from "react";
import WeeklyChart from "../components/chart/WeeklyChart";
import YearlyChart from "../components/chart/YearlyChart";
import DailyChart from "../components/chart/DailyChart";
import MonthlyChart from "../components/chart/MonthlyChart";
import { styled } from "styled-components";
import { palette } from "../styles/GlobalStyles";
import PeriodChart from "../components/chart/PeriodChart";
import axios from "axios";

const Accounting = () => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [data, setData] = useState({});
  const [duration, setDuration] = useState({
    startDate: "",
    endDate: "",
  });

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
        setSelectedChart(
          <WeeklyChart
            datas={data.week}
            salesWeek={data.salesWeek}
            recentWeek={data.recentWeek}
          />
        );
        break;
      case "연 매출":
        setSelectedChart(
          <YearlyChart
            datas={data.year}
            salesYear={data.salesYear}
            recentYear={data.recentYear}
          />
        );
        break;
      case "일 매출":
        setSelectedChart(
          <DailyChart
            datas={data.date}
            recentDate={data.recentDate}
            salesDate={data.salesDate}
          />
        );
        break;
      case "월별 매출":
        setSelectedChart(
          <MonthlyChart
            datas={data.month}
            salesMonth={data.salesMonth}
            recentMonth={data.recentMonth}
            gender={data.genderMonth}
            averageAge={data.averageAge}
          />
        );
        break;

      case "기간별":
        setSelectedChart(<PeriodChart duration={duration} />);
        break;
      default:
        setSelectedChart(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("/doctor/month-sales-view", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => setData(res.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  // console.log(data);
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
        <Duration>
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
        </Duration>
      </Buttons>
      {selectedChart}
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
  min-width: 700px;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;
const Button = styled.button`
  background-color: #1798e1;
  border: none;
  padding: 0.5rem 1rem;
  color: ${palette.white};
  font-weight: 700;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
`;
const Duration = styled.div`
  grid-column: 2 span;
  display: flex;
  /* justify-content: space-between; */
`;
