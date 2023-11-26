import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { styled } from "styled-components";
import useActiveChart from "../../hooks/useActiveChart";
import RevenueChart from "./RevenueChart";
import LatestChart from "./LatestChart";
import Button from "../Button";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "주별 매출과 환자 수 추이",
    },
  },
  scales: {
    "y-axis-1": {
      type: "linear",
      position: "left",
      ticks: {
        beginAtZero: true,
      },
      title: {
        display: true,
        text: "주별 매출 (원)",
      },
    },
    "y-axis-2": {
      type: "linear",
      position: "right",
      ticks: {
        beginAtZero: true,
      },
      title: {
        display: true,
        text: "환자 수",
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const WeeklyChart = ({ datas, salesWeek, recentWeek }) => {
  const { activeChart, handleChart } = useActiveChart(); // 커스텀 훅 사용
  const labels = datas.map((item) => {
    const startDate = item.start;
    const endDate = item.end;
    const dateRange = `${startDate} ~ ${endDate}`;
    return dateRange;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "주간 매출",
        data: datas.map((item) => item.sum),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y-axis-1",
        type: "line",
      },
      {
        label: "환자수",
        data: datas.map((item) => item.patientCount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y-axis-2",
        type: "bar",
      },
    ],
  };
  return (
    <Wrapper>
      <ChartContainer>
        <Line options={options} data={data} />
        {activeChart === "revenue" && <RevenueChart basisData={salesWeek} />}
        {activeChart === "latest" && <LatestChart basisData={recentWeek} />}
        <Buttons>
          <Button
            width="100px"
            padding="10px"
            borderRadius="7px"
            onClick={() => handleChart("revenue")}
          >
            매출별
          </Button>
          <Button
            width="100px"
            padding="10px"
            borderRadius="7px"
            onClick={() => handleChart("latest")}
          >
            최신순
          </Button>
        </Buttons>
      </ChartContainer>
    </Wrapper>
  );
};
export const Wrapper = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;
export default WeeklyChart;
