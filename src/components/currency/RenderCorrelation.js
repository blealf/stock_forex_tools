import React from 'react';
import styled from 'styled-components';
import { mainBg } from '../../utilities/colors';

const CorrCurrency = styled.div`
  box-shadow: -4px -2px 2px #E0E0E0;
  padding: 8px;
  background: #F5F5F5;
  border-radius: 2px;
  cursor: pointer;
`;
const Pair = styled.h3`
  margin: 0;
  padding-bottom: 10px;
`;
const CorrSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  border-bottom: 1px solid ${mainBg};
`;
const CorrTime = styled.div`
  font-weight: 500;
`;
const CorrValue = styled.div`
  font-style: italic;
`;

const RenderCorrelation = ({ pair, correlation }) => {
  return (
    <CorrCurrency key={pair}>
      <Pair>EURUSD vs USDJPY</Pair>
      <CorrSummary>
        <CorrTime>1 Month: </CorrTime>
        <CorrValue>{correlation(pair)}</CorrValue>
      </CorrSummary>
      <CorrSummary>
        <CorrTime>6 Months</CorrTime>
        <CorrValue></CorrValue>
      </CorrSummary>
      <CorrSummary>
        <CorrTime>1 Year</CorrTime>
        <CorrValue></CorrValue>
      </CorrSummary>
    </CorrCurrency>
  )
}

export default RenderCorrelation
