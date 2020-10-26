import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import useFetch from '../../utilities/useFetch';
import { mainBg } from '../../utilities/colors';
import CorrelationChart from './CorrelationChart';
import RenderCorrelation from './RenderCorrelation';

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



const Correlation = () => {
  const base = "USD";
  const symbols = ["EUR","JPY","CHF","AUD","CAD","NZD", "GBP"];
  var useSymbols = "";
  symbols.forEach((currency, index) => {
    if(index !== symbols.length - 1) {
      useSymbols += `${currency},`
    } else {
      useSymbols += `${currency}`
    }
  })
  const url=`https://api.exchangeratesapi.io/history?start_at=2020-10-10&end_at=2020-10-22&base=USD&symbols=${useSymbols}`
  // const url = "http://";
  const { data, loading, error } = useFetch(url)
  const [ currencyData, setCurrencyData ] = useState([]);
  
  useEffect(() => {
    setCurrencyData(data)
  }, [data])

  const [corrChart, setCorrChart] = useState(false);
  
  const sampleData = [{
    "rates": {
      "2020-10-12": {"CHF": 1.3, "AUD": 1.4},
      "2020-10-13": {"CHF": 1.5, "AUD": 1.7},
      "2020-10-14": {"CHF": 1.5, "AUD": 1.7}
    },
    "base": "USD",
    "start_at": "2020-10-10",
    "end_at": "2020-10-22"
  }]

  const getPairs = () => {
    const pairData = {};
    const pairDate = [];
    if(currencyData && currencyData.length !== 0){
      const formatedData = [];
      for(let i in currencyData["rates"]){
        pairDate.push(i)
        for(let j in currencyData["rates"][i]){
          const pairName = 'USD'+j;
          formatedData.push({ [`${pairName}`] : currencyData["rates"][i][j]})
        }
      }
      // for(let i in sampleData[0]["rates"]){
      //   pairDate.push(i)
      //   for(let j in sampleData[0]["rates"][i]){
      //     const pairName = 'USD'+j;
      //     formatedData.push({ [`${pairName}`] : sampleData[0]["rates"][i][j]})
      //   }
      // }

      symbols.map(item => {
        pairData[`USD${item}`] = [...formatedData.filter(value => (
            (value[[`USD${item}`]] !== undefined)
          )).map(pair => (
            pair[[`USD${item}`]]
          ))]
      })

      // console.log(pairData)
    }
    return { pairData, pairDate }
  }
  
  console.log(getPairs());
  

  const calculateCorrelation = (pair) => {
    if(currencyData && currencyData.length !== 0){
      // const pair = "USDCHF USDAUD";
      const pair1 = pair.split(" ")[0];
      const pair2 = pair.split(" ")[1];

      const corrData = [
        {[pair1]: getPairs().pairData[pair1]},
        {[pair2]: getPairs().pairData[pair2]},
        {"date": getPairs().pairDate}
      ]
      
      const getSum = (total, num) => {
        return total + num
      }
      const getExponent = (total, num) => {
        return total + (num * num)
      }
      const dataLength = corrData[0][pair1].length;
      const Ex = corrData[0][pair1].reduce(getSum, 0);
      const Ey = corrData[1][pair2].reduce(getSum, 0);
      const ExSquared = corrData[0][pair1].reduce(getExponent, 0);
      const EySquared = corrData[1][pair2].reduce(getExponent, 0);
      var Exy = 0;
      for(let a = 0; a < dataLength; a++){
        Exy += (corrData[0][pair1][a] * corrData[1][pair2][a])
      }
      
      // console.log(corrData[1][pair2])

      const correlation = (((dataLength * Exy) - (Ex * Ey))/Math.sqrt(((dataLength * ExSquared) - (Ex * Ex)) * ((dataLength * EySquared) - (Ey * Ey)))).toFixed(2);

      console.log(correlation);
      return correlation;
    }
  }

  if (loading) return (<div>Loading...</div>)
  if (error) return(<pre>{JSON.stringify(error, null, 2)}</pre>)

  return (
    <CorrWrapper>
      <CorrTitleWrapper>
        <CorrTitle>
          Curency Correlation <em>(Base Currency {base})</em> 
        </CorrTitle>
      </CorrTitleWrapper>
      {/* {console.log(calculateCorrelation("USDCHF USDAUD"))} */}
      <CorrCurrencyWrap>
        <RenderCorrelation
          pair="USDEUR USDAUD"
          correlation={calculateCorrelation}
        />
        <RenderCorrelation
          pair="USDEUR USDJPY"
          correlation={calculateCorrelation}
        />
        <RenderCorrelation
          pair="USDEUR USDGBP"
          correlation={calculateCorrelation}
        />
      </CorrCurrencyWrap>
      {/* <CorrelationChart 
        corrData={corrData} 
        pair={pair}
      /> */}
    </CorrWrapper>
  )
}

export default Correlation
