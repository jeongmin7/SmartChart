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
const labels = datas.map((item) => item.year);
export const data = {
  labels,
  datasets: [
    {
      label: "year",
      data: datas.map((item) => item.sum),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const YearlyChart = () => {
  return (
    <Wrapper>
      <Line options={options} data={data} />
    </Wrapper>
  );
};

export default YearlyChart;
