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
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Buttons, ChartContainer, Wrapper } from "./WeeklyChart";
import RevenueChart from "./RevenueChart";
import LatestChart from "./LatestChart";
import useActiveChart from "../../hooks/useActiveChart";
import Button from "../Button";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
);

const recentYear = [
  {
    sum: 400,
    date: "2023-08",
    patientCount: 1,
  },
  {
    sum: 20000,
    date: "2023-07",
    patientCount: 1,
  },
  {
    sum: 1600000,
    date: "2023-06",
    patientCount: 1,
  },
];

const salesYear = [
  {
    sum: 1600000,
    date: "2023-08",
    patientCount: 1,
  },
  {
    sum: 140000,
    date: "2023-07",
    patientCount: 1,
  },
  {
    sum: 40000,
    date: "2023-06",
    patientCount: 1,
  },
];

const datas = [
  {
    sum: 800,
    year: 2013,
    patientCount: 2,
  },
  {
    sum: 1800400,
    year: 2023,
    patientCount: 5,
  },
];

const data = {
  labels: datas.map((item) => item.year),

  datasets: [
    {
      label: "연 매출",
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

const options = {
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "연별 매출과 환자 수 추이",
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
        text: "연별 매출 (원)",
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

const YearlyChart = () => {
  const { activeChart, handleChart } = useActiveChart();

  return (
    <Wrapper>
      <ChartContainer>
        <Line data={data} options={options} />
        {activeChart === "revenue" && <RevenueChart basisData={salesYear} />}
        {activeChart === "latest" && <LatestChart basisData={recentYear} />}

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

export default YearlyChart;
