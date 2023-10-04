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
import { Wrapper } from "./WeeklyChart";
import { Line } from "react-chartjs-2";

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
    averageAge: 30,
    patientCount: 2,
  },
  {
    sum: 180000,
    year_MONTH: "2023-07",
    averageAge: 12,
    patientCount: 2,
  },
  {
    sum: 1620400,
    year_MONTH: "2023-08",
    averageAge: 18,
    patientCount: 3,
  },
];

const labels = datas.map((item) => item.year_MONTH);
export const data = {
  labels,
  datasets: [
    {
      label: "평균 나이",
      data: datas.map((item) => item.averageAge),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const AverageAgeChart = () => {
  return (
    <Wrapper>
      <Line options={options} data={data} />
    </Wrapper>
  );
};

export default AverageAgeChart;
