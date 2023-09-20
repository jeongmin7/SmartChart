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

const labels = datas.map((item) => item.year_MONTH);
export const data = {
  labels,
  datasets: [
    {
      label: "Month",
      data: datas.map((item) => item.sum),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const MonthlyChart = () => {
  return (
    <Wrapper>
      <Line options={options} data={data} />
    </Wrapper>
  );
};

export default MonthlyChart;
