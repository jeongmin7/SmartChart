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
import { Wrapper } from "./WeeklyChart";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

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
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

const labels = datas.map((item) => item.date);
export const data = {
  labels,
  datasets: [
    {
      label: "daily",
      data: datas.map((item) => item.sum),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
const PeriodChart = () => {
  return (
    <Wrapper>
      <Line options={options} data={data} />
    </Wrapper>
  );
};

export default PeriodChart;
