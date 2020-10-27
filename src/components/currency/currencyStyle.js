// import React from 'react';
import styled from 'styled-components';
import { mainBg, mainLight, altBg } from '../../utilities/colors';

const currencyStyle = () => {
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
  const CorrScene = styled.div`
    display: grid;
    grid-template-columns: 1fr 250px;
    overflow: hidden;
  `;
  const SceneLeft = styled.div`
    border-right: 3px solid ${mainLight};
    height: 80vh;
  `;
  const SceneRight = styled.div`
    border-left: 3px solid ${mainLight};
    height: 70vh;
    padding-right: 10px;
    margin-right: -15px;
    overflow-y: scroll;
    box-sizing: content-box;
    color: ${altBg};
    border-bottom: 3px solid ${mainLight};
    & > h3 {
      margin: 0;
      text-align: center;
    }
  `;
  const CorrTable = styled.div`
    font-size: ${props => props.header ? '0.9rem': '0.7rem'};
    font-weight: bolder;
    color: ${props => !props.header ? mainLight: null};
    border-bottom: ${props => props.header ? "1px solid " +  mainLight: "1px solid " +  altBg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 0 0 2px;
    min-height: 30px;
    cursor: ${props => !props.header ? "pointer": null};
    &.active {
      // outline: ${props => !props.header ? "1px solid white": null};
      padding: 3px 5px;
      background: ${altBg};
      color: ${mainBg};
      // margin-left: -10px;
      border-bottom: none;
    }
  `;
  const CorrPair = styled.div`
    margin-right: auto;
  `;
  const Corr = styled.div`
    margin-left: auto;
  `;
  const CorrChartWrapper = styled.div`
    position: relative;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
    background-color: ${altBg};
  `;

  const ChartWrapper = styled.div``;
  const Chart = styled.div`

  `;

  return {
    CorrWrapper,
    CorrTitleWrapper,
    CorrTitle,
    CorrScene,
    SceneLeft,
    SceneRight,
    CorrTable,
    CorrPair,
    Corr,
    CorrChartWrapper,
    ChartWrapper,
    Chart
  }
}

export default currencyStyle
