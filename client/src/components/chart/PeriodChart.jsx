import React, { useEffect, useState } from "react";
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
import {
  Buttons,
  ChartContainer,
  Charts,
  MainChart,
  Wrapper,
} from "./WeeklyChart";
import useActiveChart from "../../hooks/useActiveChart";
import Button from "../Button";
import RevenueChart from "./RevenueChart";
import LatestChart from "./LatestChart";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "기간별 매출과 환자 수 추이",
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
        text: "기간별 매출 (원)",
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

const PeriodChart = ({ duration }) => {
  const { activeChart, handleChart } = useActiveChart();
  const [chartData, setChartData] = useState({
    period: [],
    recent: [],
    salse: [],
  });
  const period = chartData.period || [];
  const labels = period.map((item) => item.date);

  const data = {
    labels,
    datasets: [
      {
        label: "기간별 매출",
        data: period.map((item) => item.sum),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y-axis-1",
        type: "line",
      },
      {
        label: "환자수",
        data: period.map((item) => item.patientCount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y-axis-2",
        type: "bar",
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .post("/doctor/period-sales", {
            startDate: duration.startDate,
            endDate: duration.endDate,
          })
          .then((res) => setChartData(res.data));
      } catch (error) {
        toast.error("데이터를 읽어오는데 실패했습니다.");
      }
    };

    fetchData();
  }, [duration.endDate, duration.startDate]);

  return (
    <Wrapper>
      <ChartContainer>
        {chartData.period && chartData.period.length === 0 ? (
          <Nothing>검색 결과가 없습니다.</Nothing>
        ) : (
          <>
            <Charts>
              <MainChart>
                <Line options={options} data={data} />
              </MainChart>
              {activeChart === "revenue" && (
                <RevenueChart basisData={chartData.sales} />
              )}
              {activeChart === "latest" && (
                <LatestChart basisData={chartData.recent} />
              )}
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
          </>
        )}
      </ChartContainer>
    </Wrapper>
  );
};

export default PeriodChart;

const Nothing = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 600px;
  font-size: 20px;
  font-weight: 600;
`;
