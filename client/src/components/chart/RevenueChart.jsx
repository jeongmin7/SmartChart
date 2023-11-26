import React from "react";
import { Line } from "react-chartjs-2";
import { Wrapper } from "./WeeklyChart";

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
