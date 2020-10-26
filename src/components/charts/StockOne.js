import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line, Bar } from 'react-chartjs-2';
import useFetch from '../../utilities/useFetch';

const StockWrapper = styled.div`
  padding: 7em 2em 2em 2em;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.9em;
  justify-content: center;
`;
const ChartWrapper = styled.div`
  overflow-x: scroll;
`;
const Chart = styled.div`
  position: relative;
  width: 1200px;
  padding: 1em 2em 1em 1em;
  background-color: #ededde;
`;
const MetaData = styled.div`
  padding: 1em;
  // text-align: center;
  font-weight: 400;
`;
const MetaDataItem = styled.h4`
  font-weight: 400;
`;


const StockOne = React.memo(() => {
  
  const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo";

  const { loading, data, error }    = useFetch(url)
  const [ metaData, setMetaData ]   = useState([])
  const [ dataLabel, setDataLabel ] = useState([]);
  const [ timeData, setTimeData ]   = useState([]);
  // const [ open, close, high, low, volume ] = []

  useEffect(() => {
      if(data && data.length !== 0){
        for (let y in data["Meta Data"]){
          setMetaData(metaData => [...metaData, `${y}: ${data["Meta Data"][y]}`])
        }
        for (let x in data["Time Series (Daily)"]) {
          setDataLabel(dataLabel => [...dataLabel, x])
          setTimeData(timeData => [...timeData, data["Time Series (Daily)"][x]])
        }
      }
  }, [data]);

  //Reverse the data to put the most recent on the right on the chart
  timeData.reverse();
  dataLabel.reverse();
  // variables
  const low     = timeData.map(item => parseInt(item["3. low"]));
  const open    = timeData.map(item => parseInt(item["1. open"]));
  const high    = timeData.map(item => parseInt(item["2. high"]));
  const close   = timeData.map(item => parseInt(item["4. close"]));
  const volume  = timeData.map(item => parseInt(item["5. volume"]));
  
  const stockData = (canvas) => {
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0,0,100,0);
    return {
      labels: dataLabel,
      datasets: [{
          label: 'open',
          data: open,
          backgroundColor: gradient,
          borderColor: "blue",
          borderWidth: 1
      },
      {
        label: 'close',
        data: close,
        backgroundColor: gradient,
        borderColor: "cyan",
        borderWidth: 1
      },
      {
        label: 'high',
        data: high,
        backgroundColor: gradient,
        borderColor: "green",
        borderWidth: 1
      },
      {
        label: 'low',
        data: low,
        backgroundColor: gradient,
        borderColor: "red",
        borderWidth: 1
      }
    ]}
  }

  const volumeData = (canvas) => {
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0,0,100,0);
    return {
      labels: dataLabel,
      datasets: [{
          label: "Volume",
          data: volume,
          backgroundColor: "teal",
          borderColor: gradient,
          borderWidth: 1
      }
    ]}
  }

  if (loading) return (<div>Loading...</div>)
  if(error) return (<pre>{JSON.stringify(error, null, 2)}</pre>);
  return (
    <StockWrapper>
      <MetaData>
        <h2>MetaData</h2>
        {
          metaData.map(mData => (<MetaDataItem key={mData}>{mData}</MetaDataItem>)
          )
        }
      </MetaData>
      <ChartWrapper>
        <Chart>
          <Line 
            width={100}
            height={40}
            data={stockData}
            options={{
              title:{
                display: true,
                text: 'Time Series Stock Data (Daily)'
              }
            }}
          />
        </Chart>
      </ChartWrapper>
      
      <ChartWrapper>
        <Chart>
          <Bar
            width={100}
            height={40}
            data={volumeData}
            options={{
              title:{
                display: true,
                text: 'Time Series Stock Data Volume (Daily)'
              }
            }}
          />
        </Chart>
      </ChartWrapper>
    </StockWrapper>
  )
})

export default StockOne;