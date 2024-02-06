import { ChartData } from "chart.js"
import { getRandomCOlor } from "utils/other";
import { IChartData } from "./interfaces";

export const getChartData = (data: Array<IChartData>) =>
  data.reduce((acc: ChartData<"doughnut", number[], unknown>, item) => {
    const color = getRandomCOlor()
    return {
      labels: [...acc.labels || [], item.name],
      datasets: [
        {
          data: [...acc.datasets[0].data, item.value],
          backgroundColor: [...acc.datasets[0].backgroundColor as string, color],
          borderColor: [...acc.datasets[0].borderColor as string, color],
        },
      ],
    }
  }, {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1
    }]
  })
