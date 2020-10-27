import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import styled from 'styled-components';

import Header from './components/header/Header';
import StockOne from './components/charts/StockOne';
import CurrencyOne from './components/charts/CurrencyOne';
import Correlation from './components/currency/Correlation'
import Journal from './components/journal/Journal';
// import CurrencyHistory from './components/charts/CurrenctHistory';

const AppWrapper = styled.div`
  background-color: background-color: #fcfcf5;
  font-family: 'Montserrat', sans-serif;
`;

function App() {
  return (
    <AppWrapper className="App">
      <Header />
      <Switch>
        <Route exact path="/stock" component={StockOne}/>
        <Route exact path="/currencies" component={CurrencyOne}/>
        <Route exact path="/correlation" component={Correlation}/>
        <Route exact path="/journal" component={Journal}/>
        {/* <Route exact path="/history" component={CurrencyHistory}/> */}
      </Switch>
    </AppWrapper>
  );
}

export default App;