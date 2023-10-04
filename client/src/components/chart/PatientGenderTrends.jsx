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
import { Wrapper } from "./WeeklyChart";

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
const datas = [
  {
    sum: 800,
    year_MONTH: "2013-08",
    patientCount: 2,
    maleCount: 2,
    femaleCount: 0,
  },
  {
    sum: 180000,
    year_MONTH: "2023-07",
    patientCount: 2,
    maleCount: 0,
    femaleCount: 2,
  },
  {
    sum: 1620400,
    year_MONTH: "2023-08",
    patientCount: 3,
    maleCount: 1,
    femaleCount: 2,
  },
];

const data = {
  labels: datas.map((item) => item.year_MONTH),

  datasets: [
    {
      label: "남성",
      data: datas.map((item) => item.maleCount),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "y-axis-male",
      type: "line",
    },

    {
      label: "여성",
      data: datas.map((item) => item.femaleCount),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      yAxisID: "y-axis-female",
      type: "line",
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
      text: "월간 성별 추이",
    },
  },
  scales: {
    "y-axis-male": {
      type: "linear",
      position: "left",
      ticks: {
        beginAtZero: true,
      },
      title: {
        display: true,
        text: "남성 수 ",
      },
    },
    "y-axis-female": {
      type: "linear",
      position: "right",
      ticks: {
        beginAtZero: true,
      },
      title: {
        display: true,
        text: "여성 수",
      },
    },
  },
};

const PatientGenderTrends = () => {
  return (
    <Wrapper>
      <Line data={data} options={options} />
    </Wrapper>
  );
};

export default PatientGenderTrends;
