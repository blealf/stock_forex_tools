import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const CorrChartWrapper = styled.div`
  position: relative;
  max-width: 600px;
  height: 400px;
  margin: 0 auto;
`;

const ChartWrapper = styled.div``;
const Chart = styled.div`

`;
const CorrelationChart = (
  {pair,
  corrData}
) => {

  const pair1 = pair.split(" ")[0];
  const pair2 = pair.split(" ")[1];

  const chartData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0,0,100,0);
    return {
      labels: corrData[2]["date"],
      datasets: [{
        label: pair1,
        data: corrData[0][pair1],
        backgroundColor: gradient,
        borderColor: "cyan",
        bordeWidth: 1
      },
      {
        label: pair2,
        data: corrData[1][pair2],
        backgroundColor: gradient,
        borderColor: "blue",
        bordeWidth: 1
      }]
    }
  }
  return (
    <CorrChartWrapper>
      <Line 
        data={chartData}
        width={500}
        height={500}
        options={{
          title: {
            display: true,
            text: pair
          }
        }}
      />
    </CorrChartWrapper>
  )
}

export default CorrelationChart
