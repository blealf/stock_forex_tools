import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; 
import useFetch from '../../utilities/useFetch';

const CurrencyWrapper = styled.div`
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

const CurrenctHistory = () => {
  const url = `https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01`;
  const { loading, data, error }    = useFetch(url)
  const [metaData, setMetaData ] = useState([]);
  const [currencyName, setCurrencyName ] = useState([]);
  const [dataLabel, setDataLabel ] = useState([]);
  const [currencyValue, setCurrencyValue ] = useState([]);
  // const [ open, close, high, low, volume ] = []

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
        setDataLabel(dataLabel => [...dataLabel, i])
        setCurrencyValue(currencyValue => [...currencyValue, data["rates"][i]])
      }
    }
  }, [data]);

  
  

  if (loading) return (<div>Loading...</div>)
  if(error) return (<pre>{JSON.stringify(error, null, 2)}</pre>);

  return (
    <CurrencyWrapper>
      {console.log(dataLabel)}
    </CurrencyWrapper>
  )
}

export default CurrenctHistory
