import React, { useEffect, useState } from "react";
import WeeklyChart from "../components/chart/WeeklyChart";
import YearlyChart from "../components/chart/YearlyChart";
import DailyChart from "../components/chart/DailyChart";
import MonthlyChart from "../components/chart/MonthlyChart";
import PeriodChart from "../components/chart/PeriodChart";
import axios from "axios";
import Table from "../components/chart/Table";
import { toast } from "react-toastify";
import AccountingComponent from "../components/AccountingComponent";

const AccountingContainer = () => {
  const [selectedChart, setSelectedChart] = useState(null);
  const [data, setData] = useState({
    recentMonth: [],
    salesDate: [],
    salesWeek: [],
    recentDate: [],
    salesYear: [],
    recentWeek: [],
    averageAgeMonth: [],
    recentYear: [],
    genderMonth: [],
    salesMonth: [],
    year: [],
    month: [],
    week: [],
    date: [],
  });
  const [duration, setDuration] = useState({
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [wrapperHeight, setWrapperHeight] = useState(800);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setDuration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isSearchButtonDisabled = !duration.startDate || !duration.endDate;

  const handleChartSelection = (chartType) => {
    switch (chartType) {
      case "주간 매출":
        setSelectedChart(
          <>
            <WeeklyChart
              datas={data.week}
              salesWeek={data.salesWeek}
              recentWeek={data.recentWeek}
            />
            <Table selectedChart={selectedChart} tableData={data.week} />
          </>
        );
        break;
      case "연 매출":
        setSelectedChart(
          <>
            <YearlyChart
              datas={data.year}
              salesYear={data.salesYear}
              recentYear={data.recentYear}
            />
            <Table selectedChart={selectedChart} tableData={data.year} />
          </>
        );
        break;
      case "일 매출":
        setSelectedChart(
          <>
            <DailyChart
              datas={data.date}
              recentDate={data.recentDate}
              salesDate={data.salesDate}
            />
            <Table selectedChart={selectedChart} tableData={data.date} />
          </>
        );
        break;
      case "월별 매출":
        setSelectedChart(
          <>
            <MonthlyChart
              datas={data.month}
              salesMonth={data.salesMonth}
              recentMonth={data.recentMonth}
              gender={data.genderMonth}
              averageAge={data.averageAgeMonth}
            />
            <Table selectedChart={selectedChart} tableData={data.genderMonth} />
          </>
        );
        break;

      case "기간별":
        setSelectedChart(<PeriodChart duration={duration} />);
        break;
      default:
        setSelectedChart(null);
    }
    setSelectedButton(chartType);
    setWrapperHeight("auto");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/doctor/month-sales-view", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        toast.error("데이터를 읽어오는데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleChartSelection("월별 매출");
  }, [data]);

  return (
    <AccountingComponent
      selectedChart={selectedChart}
      handleChartSelection={handleChartSelection}
      selectedButton={selectedButton}
      handleDateChange={handleDateChange}
      isSearchButtonDisabled={isSearchButtonDisabled}
      duration={duration}
      data={data}
      wrapperHeight={wrapperHeight}
    />
  );
};

export default AccountingContainer;
