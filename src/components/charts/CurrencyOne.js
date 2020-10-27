import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import useFetch from '../../utilities/useFetch';


const CurrencyWrapper = styled.div`
  padding: 1.5em 1.5em 1.5em 1.5em;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`;
const ChartWrapper = styled.div`
  padding: 1.5em 1.5em 1.5em 1.5em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
  justify-content: center;
  align-items: center;
`;
const Chart = styled.div`
  padding: 0.2em;
  position: relative;
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
const CurrencyHeader = styled.h3`
  text-align: center;
  font-weight: 400;
`;
const ButtonWrapper = styled.div`
  margin: 0 auto;
  max-width: 500px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0.2em;
`;
const ChangeBaseCurrency = styled.button`
  // padding: 0.1em 0.1em 0.1em 0.1em;
  font-size: 0.8em;
  font-weight: bold;
  background-color: #90BE6D;
  border: none;
  border-radius: 0.1em;
  box-shadow: 0.2em 0.2em 0.1em #37371F;
  margin-right: 1em;
  justify-self: space-between;
  font-weight: 600;
`;



const CurrencyOne = React.memo(() => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  // const url = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}&symbols=USD,GBP,CAD,AUD,NZD,CHF,JPY`;
  const url = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}&symbols=GBP,CAD,AUD,CHF,EUR`;
  // const url = `https://api.exchangeratesapi.io/latest?base=${baseCurrency}`

  const { data, loading, error } = useFetch(url);
  const [metaData, setMetaData ] = useState([]);
  const [currencyName, setCurrencyName ] = useState([]);
  const [currencyValue, setCurrencyValue ] = useState([]);
  

  useEffect(() => {
    if(data && data.length !== 0) {
      setMetaData([]);
      setCurrencyName([]);
      setCurrencyValue([]);
      for (let i in data){
        if(i !== "rates"){
          setMetaData(metaData => [...metaData, `${i}: ${data[i]}`])
        }
      }
    
      for (let i in data["rates"]){
        setCurrencyName(currencyName => [...currencyName, i])
        setCurrencyValue(currencyValue => [...currencyValue, data["rates"][i]])
        console.log(currencyName + ": " + currencyValue)
      }
    }
  }, [baseCurrency, data]);
  
  const currencyData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0,0,100,0);

    return {
      labels: currencyName,
      datasets: [{
          label: 'Currencies',
          data: currencyValue,
          backgroundColor: gradient,
          borderColor: "blue",
          borderWidth: 1
      }]
    }
  }

  const currencies = () => {
    let i = [];
    currencyName.sort().forEach(cName => {
      i.push(<ChangeBaseCurrency 
        key={cName}
        onClick={() => { setBaseCurrency(cName) }}
        style={{ 
          backgroundColor: (baseCurrency === cName) ? "#37371F" : "#90BE6D",
          color: (baseCurrency === cName) ? "#90BE6D" : "#37371F",
         }}
      >{cName}</ChangeBaseCurrency>)
    })
    return i;
  }

  if(loading) return(<div>Loading...</div>);
  if(error) return(<pre>{JSON.stringify(error, null, 2)}</pre>)

  return (
    <CurrencyWrapper>
      <MetaData>
        <h2>MetaData</h2>
        {
          metaData.map(mData => (<MetaDataItem key={mData}>{mData.toUpperCase()}</MetaDataItem>))
        }
      </MetaData>
      <CurrencyHeader>
        Change Base Currency - current: {baseCurrency}
      </CurrencyHeader>
      <ButtonWrapper>
        {currencies()}
      </ButtonWrapper>
      <ChartWrapper>
        <Chart>
          <Line 
            data={currencyData}
            width={500}
            height={500}
            options={{
              title: {
                display: true,
                text: `Currencies Against the ${baseCurrency}`
              }
            },
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
        </Chart>
      </ChartWrapper>
    </CurrencyWrapper>
  )
})

export default CurrencyOne;