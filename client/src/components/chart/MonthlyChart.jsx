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
import RevenueChart from "./RevenueChart";
import LatestChart from "./LatestChart";
import Button from "../Button";
import AverageAgeChart from "./AverageAgeChart";
import PatientGenderTrends from "./PatientGenderTrends";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const salesMonth = [
  {
    sum: 1620400,
    year_MONTH: "2023-08",
    patientCount: 3,
  },
  {
    sum: 180000,
    year_MONTH: "2023-07",
    patientCount: 2,
  },
  {
    sum: 800,
    year_MONTH: "2013-08",
    patientCount: 2,
  },
];
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
        text: "월간 매출 (원)",
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
const datas = [
  {
    sum: 800,
    year_MONTH: "2013-08",
    patientCount: 2,
  },
  {
    sum: 180000,
    year_MONTH: "2023-07",
    patientCount: 2,
  },
  {
    sum: 1620400,
    year_MONTH: "2023-08",
    patientCount: 3,
  },
];
const recentMonth = [
  {
    sum: 1620400,
    year_MONTH: "2023-08",
    patientCount: 3,
  },
  {
    sum: 180000,
    year_MONTH: "2023-07",
    patientCount: 2,
  },
  {
    sum: 800,
    year_MONTH: "2013-08",
    patientCount: 2,
  },
];
const labels = datas.map((item) => item.year_MONTH);
const data = {
  labels: labels,

  datasets: [
    {
      label: "월 매출",
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

const MonthlyChart = () => {
  const { activeChart, handleChart } = useActiveChart();

  return (
    <Wrapper>
      <ChartContainer>
        <Line data={data} options={options} />
        {activeChart === "gender" && <PatientGenderTrends />}
        {activeChart === "averageAge" && <AverageAgeChart />}

        {activeChart === "revenue" && <RevenueChart basisData={salesMonth} />}
        {activeChart === "latest" && <LatestChart basisData={recentMonth} />}

        <Buttons>
          <Button
            width="100px"
            padding="10px"
            borderRadius="7px"
            onClick={() => handleChart("gender")}
          >
            월별 성별
          </Button>
          <Button
            width="100px"
            padding="10px"
            borderRadius="7px"
            onClick={() => handleChart("averageAge")}
            whiteSpace="nowrap"
          >
            월별 평균 나이
          </Button>
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

export default MonthlyChart;
