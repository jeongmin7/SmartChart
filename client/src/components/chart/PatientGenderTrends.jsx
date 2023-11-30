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
  BarController,
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
  BarController
);

const PatientGenderTrends = ({ datas }) => {
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

  return (
    <Wrapper>
      <Line data={data} options={options} />
    </Wrapper>
  );
};

export default PatientGenderTrends;
