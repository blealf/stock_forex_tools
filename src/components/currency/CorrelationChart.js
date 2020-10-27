import React from 'react';
import { Line } from 'react-chartjs-2';
import currencyStyle from './currencyStyle';
import formatPairName from './formatPairName';
const {
  CorrChartWrapper
} = currencyStyle();

const CorrelationChart = (
  {
    corrData,
    pairs
  }
) => {
  const formattedPairName = formatPairName(pairs);
  const pairOne = formattedPairName.split(" & ")[0];
  const pairTwo = formattedPairName.split(" & ")[1];

  const chartData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0,0,100,0);
    return {
      labels: corrData[2]["date"],
      datasets: [{
        label: pairOne,
        data: corrData[0][pairOne],
        backgroundColor: gradient,
        borderColor: "red",
        bordeWidth: 1
      },
      {
        label: pairTwo,
        data: corrData[1][pairTwo],
        backgroundColor: gradient,
        borderColor: "blue",
        bordeWidth: 1
      }]
    }
  }
  return (
    <CorrChartWrapper>
      {
        (corrData.length !== 0 ? 
          (<Line 
            data={chartData}
            // width={500}
            // height={400}
            options={
              { title: {
                display: true,
                text: formattedPairName
              }
            },
            { maintainAspectRatio: false },
            { scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  // max: 500,
                  min: 0,
                  // stepSize: 1
                }
              }]
          }}
          }
          />
        ): null)
      }
    </CorrChartWrapper>
  )
}

export default CorrelationChart
