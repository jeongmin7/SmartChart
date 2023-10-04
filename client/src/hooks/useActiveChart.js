import { useState } from "react";

function useActiveChart() {
  const [activeChart, setActiveChart] = useState(null);

  const handleChart = (chartType) => {
    switch (chartType) {
      case "revenue":
        setActiveChart("revenue");
        break;
      case "latest":
        setActiveChart("latest");
        break;
      default:
        setActiveChart(null);
    }
  };

  return {
    activeChart,
    handleChart,
  };
}

export default useActiveChart;
