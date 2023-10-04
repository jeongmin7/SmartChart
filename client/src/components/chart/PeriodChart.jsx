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
import { Buttons, ChartContainer, Wrapper } from "./WeeklyChart";
import useActiveChart from "../../hooks/useActiveChart";
import Button from "../Button";
import RevenueChart from "./RevenueChart";
import LatestChart from "./LatestChart";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const recentPeriod = [
  {
    sum: 400,
    date: "2023-08-09",
    patientCount: 1,
  },
  {
    sum: 20000,
    date: "2023-08-08",
    patientCount: 1,
  },
  {
    sum: 1600000,
    date: "2023-08-04",
    patientCount: 1,
  },
  {
    sum: 140000,
    date: "2023-07-09",
    patientCount: 1,
  },
  {
    sum: 40000,
    date: "2023-07-08",
    patientCount: 1,
  },
];
const salesPeriod = [
  {
    sum: 1600000,
    date: "2023-08-04",
    patientCount: 1,
  },
  {
    sum: 140000,
    date: "2023-07-09",
    patientCount: 1,
  },
  {
    sum: 40000,
    date: "2023-07-08",
    patientCount: 1,
  },
  {
    sum: 20000,
    date: "2023-08-08",
    patientCount: 1,
  },
  {
    sum: 400,
    date: "2023-08-09",
    patientCount: 1,
  },
];

const datas = [
  {
    sum: 40000,
    date: "2023-07-08",
    patientCount: 1,
  },
  {
    sum: 140000,
    date: "2023-07-09",
    patientCount: 1,
  },
  {
    sum: 1600000,
    date: "2023-08-04",
    patientCount: 1,
  },
  {
    sum: 20000,
    date: "2023-08-08",
    patientCount: 1,
  },
  {
    sum: 400,
    date: "2023-08-09",
    patientCount: 1,
  },
];
const options = {
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "기간별 매출과 환자 수 추이",
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
        text: "기간별 매출 (원)",
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

const labels = datas.map((item) => item.date);
export const data = {
  labels,
  datasets: [
    {
      label: "기간별 매출",
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
const PeriodChart = () => {
  const { activeChart, handleChart } = useActiveChart();

  return (
    <Wrapper>
      <ChartContainer>
        <Line options={options} data={data} />
        {activeChart === "revenue" && <RevenueChart basisData={salesPeriod} />}
        {activeChart === "latest" && <LatestChart basisData={recentPeriod} />}
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

export default PeriodChart;
