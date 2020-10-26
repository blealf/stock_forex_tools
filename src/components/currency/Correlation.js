import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import useFetch from '../../utilities/useFetch';
import { mainBg } from '../../utilities/colors';
import CorrelationChart from './CorrelationChart';

const CorrWrapper = styled.div`
  position: relative;
  margin-top: 140px;
  padding: 10px;
`;
const CorrTitleWrapper = styled.div`
  border-bottom: 1px solid ${mainBg}; 
`;
const CorrTitle = styled.h2`
  text-align: center;
`;
const CorrCurrencyWrap = styled.div`
  margin-top: 5px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const CorrCurrency = styled.div`
  box-shadow: -4px -2px 2px #E0E0E0;
  padding: 5px;
  background: #F5F5F5;
  border-radius: 2px;
  cursor: pointer;
`;
const Pair = styled.h3`

`;
const CorrSummary = styled.div`
  display: flex;
`;
const CorrTime = styled.div`

`;
const CorrValue = styled.div`

`;



const Correlation = () => {
  const base = "USD";
  const symbols = ["EUR","JPY","CHF","AUD","CAD","NZD"];
  var useSymbols = "";
  symbols.forEach((currency, index) => {
    if(index !== symbols.length - 1) {
      useSymbols += `${currency},`
    } else {
      useSymbols += `${currency}`
    }
  })
  // const url=`https://api.exchangeratesapi.io/history?start_at=2020-10-10&end_at=2020-10-22&base=USD&symbols=${useSymbols}`
  // // const url = "http://";
  // const { data, loading, error } = useFetch(url)
  // const [ currencyData, setCurrencyData ] = useState([]);
  const [corrChart, setCorrChart] = useState(false);

  // useEffect(() => {
  //   setCurrencyData(data)
  // }, [data])
  
  const sample = [{
    "rates": {
      "2020-10-12": {"CHF": 1.3, "AUD": 1.4},
      "2020-10-13": {"CHF": 1.5, "AUD": 1.7},
      "2020-10-14": {"CHF": 1.5, "AUD": 1.7}
    },
    "base": "USD",
    "start_at": "2020-10-10",
    "end_at": "2020-10-22"
  }]
  console.log(sample[0])
  // for(let i in sample[0]["rates"]){
  //   console.log(i);
  // }

  // if (loading) return (<div>Loading...</div>)
  // if (error) return(<pre>{JSON.stringify(error, null, 2)}</pre>)

  const toggleCorrelationChart = () => {
    setCorrChart(!corrChart);
    return (corrChart ? <CorrelationChart /> : null)
  }
  const pair = "EURUSD USDJPY";
  const corrData = [
    {"EURUSD": [3,6,7,2,4,9]},
    {"USDJPY": [4,7,9,4,4,6]},
    {"date": ["one", "two", "three", "four", "five", "six"]}
  ]
  
  // const getSum = (total, num) => {
  //   return total + num
  // }
  // const getExponent = (total, num) => {
  //   return total + (num * num)
  // }
  // const pair1 = pair.split(" ")[0];
  // const pair2 = pair.split(" ")[1];
  // const pair1Sum = corrData[0][pair1].reduce(getSum, 0);
  // const pair2Sum = corrData[1][pair2].reduce(getSum, 0);
  // const pair1Squared = corrData[0][pair1].reduce(getExponent, 0);;
  // const pair2Squared = corrData[1][pair2].reduce(getExponent, 0);
  // console.log(pair1Sum, pair2Sum, pair1Squared, pair2Squared);

  const getCorrelation = (itemKey) => {
    return (
      <CorrCurrency key={itemKey} onClick={toggleCorrelationChart}>
        <Pair>EUR/USD vs USDJPY</Pair>
        <CorrSummary>
          <CorrValue>1 Month</CorrValue>
          <CorrTime></CorrTime>
        </CorrSummary>
        <CorrSummary>
          <CorrValue>6 Months</CorrValue>
          <CorrTime></CorrTime>
        </CorrSummary>
        <CorrSummary>
          <CorrValue></CorrValue>
          <CorrTime>1 Year</CorrTime>
        </CorrSummary>
      </CorrCurrency>
    )
  }

  return (
    <CorrWrapper>
      <CorrTitleWrapper>
        <CorrTitle>
          Curency Correlation <em>(Base Currency {base})</em> 
        </CorrTitle>
      </CorrTitleWrapper>
      {/* {console.log(currencyData)} */}
      <CorrCurrencyWrap>
        {symbols.map(item => (getCorrelation(item)))}
      </CorrCurrencyWrap>
      <CorrelationChart 
        corrData={corrData} 
        pair={pair}
      />
    </CorrWrapper>
  )
}

export default Correlation
