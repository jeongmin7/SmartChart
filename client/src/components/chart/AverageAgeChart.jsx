import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
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
  BarController,
  BarElement
);

const options = {
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

const AverageAgeChart = ({ datas }) => {
  const labels = datas.map((item) => item.year_MONTH);
  const data = {
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
  return (
    <Wrapper>
      <Line options={options} data={data} />
    </Wrapper>
  );
};

export default AverageAgeChart;
