import React from "react";
import { Line } from "react-chartjs-2";
import { Wrapper } from "./WeeklyChart";

const datas = [
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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "매출에 따른 그래프",
    },
  },
};

const RevenueChart = ({ basisData }) => {
  const labels = basisData.map((item) => {
    if (item.start && item.end) {
      return `${item.start} ~ ${item.end}`;
    } else if (item.year_MONTH) {
      return item.year_MONTH;
    } else if (item.year) {
      return item.year;
    } else {
      return item.date;
    }
  });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "매출",
        data: basisData.map((item) => item.sum),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <Wrapper>
      <Line data={data} options={options} />
    </Wrapper>
  );
};

export default RevenueChart;
