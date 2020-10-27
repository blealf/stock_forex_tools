import React, { useState, useEffect } from 'react'
// import styled from 'styled-components';
import '../../styles/style.scss';
import useFetch from '../../utilities/useFetch';
import CorrelationChart from './CorrelationChart';
import RenderCorrelation from './RenderCorrelation';
import currencyStyle from './currencyStyle';
const {
  CorrWrapper,
  CorrTitleWrapper,
  CorrTitle,
  CorrScene,
  SceneLeft,
  SceneRight,
  CorrTable,
  CorrPair,
  Corr
}  = currencyStyle();



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

  const correlationPairs = [];

  for(let i = 0; i < symbols.length; i++){
    for(let j = 0; j < symbols.length; j++){
      if(
        (`${base}${symbols[i]}` !== `${base}${symbols[j]}`) 
        && (!correlationPairs.includes(`${base}${symbols[i]} ${base}${symbols[j]}`) 
        || !correlationPairs.includes(`${base}${symbols[j]} ${base}${symbols[i]}`))
      ){
        correlationPairs.push(`${base}${symbols[i]} ${base}${symbols[j]}`)
      }
    }
  }

  var today = new Date()
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = String(today.getFullYear());
  today = yyyy + "-" + mm + "-" + dd;

  const url=`https://api.exchangeratesapi.io/history?start_at=2020-09-10&end_at=${today}&base=USD&symbols=${useSymbols}`
  // const url = "http://";
  const { data, loading, error } = useFetch(url)
  const [ currencyData, setCurrencyData ] = useState([]);
  
  useEffect(() => {
    setCurrencyData(data)
  }, [data])

  const [corrData, setCorrData] = useState([
    {"USDCHF": [1]},
    {"USDAUD": [2]},
    {"date": ["one"]}
  ]);
  const [pairs, setPairs] = useState("USDCHF USDAUD");
  const [correlation, setCorrelation] = useState(0)
  
  const sampleData = [{
    "rates": {
      "2020-10-12": {"CHF": 1.3, "AUD": 1.4, "EUR": 1.2},
      "2020-10-13": {"CHF": 1.5, "AUD": 1.7, "EUR": 1.2},
      "2020-10-14": {"CHF": 1.5, "AUD": 1.7, "EUR": 1.3}
    },
    "base": `${base}`,
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
          const pairName = base+j;
          formatedData.push({ [`${pairName}`] : currencyData["rates"][i][j]})
        }
      }
      // for(let i in sampleData[0]["rates"]){
      //   pairDate.push(i)
      //   for(let j in sampleData[0]["rates"][i]){
      //     const pairName = base+j;
      //     formatedData.push({ [`${pairName}`] : sampleData[0]["rates"][i][j]})
      //   }
      // }

      symbols.map(item => {
        pairData[`${base}${item}`] = [...formatedData.filter(value => (
            (value[[`${base}${item}`]] !== undefined)
          )).map(pair => (
            pair[[`${base}${item}`]]
          ))]
      })
    }
    return { pairData, pairDate }
  }


  const calculateCorrelation = (pair) => {
    var corrData = [];
    var correlation = 0;
    if(currencyData && currencyData.length !== 0){
      const pairOne = pair.split(" ")[0];
      const pairTwo = pair.split(" ")[1];
      const getSum = (total, num) => total + num;
      const getExponent = (total, num) => total + (num * num);
      
      corrData = [
        {[pairOne]: getPairs().pairData[pairOne]},
        {[pairTwo]: getPairs().pairData[pairTwo]},
        {"date": getPairs().pairDate}
      ]
      // console.log(getPairs().pairData[pairOne])
      const dataLength = corrData[0][pairOne].length;

      const Ex = corrData[0][pairOne].reduce(getSum, 0);
      const Ey = corrData[1][pairTwo].reduce(getSum, 0);
      const ExSquared = corrData[0][pairOne].reduce(getExponent, 0);
      const EySquared = corrData[1][pairTwo].reduce(getExponent, 0);
      var Exy = 0;
      for(let a = 0; a < dataLength; a++){
        Exy += (corrData[0][pairOne][a] * corrData[1][pairTwo][a])
      }
      
      correlation = (((dataLength * Exy) - (Ex * Ey))/Math.sqrt(((dataLength * ExSquared) - (Ex * Ex)) * ((dataLength * EySquared) - (Ey * Ey)))).toFixed(2);
    }
    return {
      correlation,
      corrData,
      pair
    };
  }

  const getChart = (pair) => {
    setPairs(calculateCorrelation(pair).pair);
    setCorrData(calculateCorrelation(pair).corrData);
    setCorrelation(calculateCorrelation(pair).correlation);
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
      

      <CorrScene>
        <SceneLeft>
          <CorrelationChart 
            corrData={corrData}
            pairs={pairs}
            correlaion={correlation}
          />
        </SceneLeft>
        <SceneRight>
          <h3>Correlation</h3>
          <CorrTable header={true}>
            <CorrPair>PAIR</CorrPair>
            <Corr>VALUE</Corr>
          </CorrTable>
          {correlationPairs.map(pair => (
            <RenderCorrelation 
              key={pair}
              getChart={getChart}
              calculateCorrelation={calculateCorrelation}
              pair={pair}
            />
          ))}
          <RenderCorrelation 
            getChart={getChart}
            calculateCorrelation={calculateCorrelation}
            pair={"USDCHF USDAUD"}
          />
          <RenderCorrelation
            getChart={getChart}
            calculateCorrelation={calculateCorrelation}
            pair={"USDEUR USDAUD"}
          />
        </SceneRight>
      </CorrScene>
    </CorrWrapper>
  )
}

export default Correlation
