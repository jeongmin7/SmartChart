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
    start: "2013-08-04",
    end: "2013-08-10",
    patientCount: 2,
  },
  {
    sum: 40000,
    start: "2023-07-02",
    end: "2023-07-08",
    patientCount: 1,
  },
  {
    sum: 140000,
    start: "2023-07-09",
    end: "2023-07-15",
    patientCount: 1,
  },
  {
    sum: 1600000,
    start: "2023-07-30",
    end: "2023-08-05",
    patientCount: 1,
  },
  {
    sum: 20400,
    start: "2023-08-06",
    end: "2023-08-12",
    patientCount: 2,
  },
];

const labels = datas.map((item) => {
  const startDate = item.start;
  const endDate = item.end;
  const dateRange = `${startDate} ~ ${endDate}`;
  return dateRange;
});

export const data = {
  labels,
  datasets: [
    {
      label: "week",
      data: datas.map((item) => item.sum),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const WeeklyChart = () => {
  return (
    <Wrapper>
      <Line options={options} data={data} />
    </Wrapper>
  );
};
export const Wrapper = styled.div`
  background-color: aliceblue;
  width: 50%;
  height: auto;
`;

export default WeeklyChart;
