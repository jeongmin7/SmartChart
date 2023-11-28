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
import {
  Buttons,
  ChartContainer,
  Charts,
  MainChart,
  Wrapper,
} from "./WeeklyChart";
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
  BarElement
);

// const recentDate = [
//   {
//     sum: 400,
//     date: "2023-08-09",
//     patientCount: 1,
//   },
//   {
//     sum: 20000,
//     date: "2023-08-08",
//     patientCount: 1,
//   },
//   {
//     sum: 1600000,
//     date: "2023-08-04",
//     patientCount: 1,
//   },
//   {
//     sum: 140000,
//     date: "2023-07-09",
//     patientCount: 1,
//   },
//   {
//     sum: 40000,
//     date: "2023-07-08",
//     patientCount: 1,
//   },
//   {
//     sum: 800,
//     date: "2013-08-09",
//     patientCount: 2,
//   },
// ];
// const salesDate = [
//   {
//     sum: 1600000,
//     date: "2023-08-04",
//     patientCount: 1,
//   },
//   {
//     sum: 140000,
//     date: "2023-07-09",
//     patientCount: 1,
//   },
//   {
//     sum: 40000,
//     date: "2023-07-08",
//     patientCount: 1,
//   },
//   {
//     sum: 20000,
//     date: "2023-08-08",
//     patientCount: 1,
//   },
//   {
//     sum: 800,
//     date: "2013-08-09",
//     patientCount: 2,
//   },
//   {
//     sum: 400,
//     date: "2023-08-09",
//     patientCount: 1,
//   },
// ];
// const datas = [
//   {
//     sum: 800,
//     date: "2013-08-09",
//     patientCount: 2,
//   },
//   {
//     sum: 40000,
//     date: "2023-07-08",
//     patientCount: 1,
//   },
//   {
//     sum: 140000,
//     date: "2023-07-09",
//     patientCount: 1,
//   },
//   {
//     sum: 1600000,
//     date: "2023-08-04",
//     patientCount: 1,
//   },
//   {
//     sum: 20000,
//     date: "2023-08-08",
//     patientCount: 1,
//   },
//   {
//     sum: 400,
//     date: "2023-08-09",
//     patientCount: 1,
//   },
// ];

const options = {
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "일별 매출과 환자 수 추이",
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
        text: "일별 매출 (원)",
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

const DailyChart = ({ datas, salesDate, recentDate }) => {
  const { activeChart, handleChart } = useActiveChart();
  const data = {
    labels: datas.map((item) => item.date),

    datasets: [
      {
        label: "일 매출",
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
  return (
    <Wrapper>
      <ChartContainer>
        <Charts>
          <MainChart>
            <Line data={data} options={options} />
          </MainChart>
          {activeChart === "revenue" && <RevenueChart basisData={salesDate} />}
          {activeChart === "latest" && <LatestChart basisData={recentDate} />}
        </Charts>
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

export default DailyChart;
