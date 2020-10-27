import React, { useRef } from 'react';

import formatPairName from './formatPairName';
import currencyStyle from './currencyStyle'
const {
  CorrTable,
  CorrPair,
  Corr 
} = currencyStyle();

const RenderCorrelation = ({ pair, getChart, calculateCorrelation }) => {
  const pairRef = useRef();

  return (
    <CorrTable 
      onClick={(e) => {
        Array.from(document.querySelectorAll('.corrPair')).forEach(element => {
          element.classList.remove('active');
        })
        getChart(pair);
        pairRef.current.classList.add('active');
      }}
      className="corrPair"
      ref={pairRef}
    >
      <CorrPair>{formatPairName(pair)}</CorrPair>
      <Corr>{calculateCorrelation(pair).correlation}</Corr>
    </CorrTable>
  )
}

export default RenderCorrelation
