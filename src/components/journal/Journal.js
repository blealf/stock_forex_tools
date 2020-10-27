import React from 'react';
import styled from 'styled-components';
import { mainBg, mainLight, altBg } from '../../utilities/colors';

const JournalWrapper = styled.div`
 position: relative;
 margin-top: 120px;
 padding: 10px;
`;
const JournalHeader = styled.div`
  border-bottom: 1px solid ${mainLight};
  & > h2 {
    text-align: center;
  }
`;
const JournalBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 3px solid ${altBg};
  @media (max-width: 600px){
    grid-template-columns: 1fr;
  }
`;
const CheckList = styled.div`
  padding: 0 5px;
  & > div {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid ${altBg};
    align-items: center;
    margin-left: 10px;
    margin-top: 1px;
    min-height: 30px;
  }
  & > div > h4 {
    // margin-top: 12px;
    width: 130px;
    font-size: 0.8rem;
  }
  & > div > p {
    margin: 0;
    margin-left: 10px;
    flex-grow: 1;
    padding: 0;
    & > input {
      height: 25px;
      width: 100%;
      background: ${mainLight};
      color: ${mainBg};
      border: none;
      outline: none;
    }
    & > textarea {
      width: 100%;
      background: ${mainLight};
      color: ${mainBg};
      border: none;
      outline: none;
    }
    & > span {
      padding: 3px;
    }
  }
`;
const Waiting = styled.div`
  padding: 5px;
`;
const History = styled.div``;


const Journal = () => {

  var today = new Date()
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = String(today.getFullYear());
  today = yyyy + "-" + mm + "-" + dd;

  return (
    <JournalWrapper>
      <JournalHeader>
        {console.log(today)}
        <h2>My Journal: {today}</h2>
      </JournalHeader>
      <JournalBody>
        <CheckList>
          <h3>Currency Checklist</h3>
          <div>
            <h4>Pair :</h4>
            <p> <input type="text" name="pair" id="pair"/> </p>
          </div>
          <div>
            <h4>Price :</h4>
            <p> <input type="text" name="price" id="price"/> </p>
          </div>
          <div>
            <h4>Daily High :</h4>
            <p> <input type="text" name="dayHigh" id="dayHigh"/> </p>
          </div>
          <div>
            <h4>Daily Low :</h4>
            <p> <input type="text" name="dayLow" id="dayLow"/> </p>
          </div>
          <div>
            <h4>10-Day High :</h4>
            <p> <input type="text" name="high10" id="high10"/> </p>
          </div>
          <div>
            <h4>10-Day Low :</h4>
            <p> <input type="text" name="low10" id="low10"/> </p>
          </div>
          <div>
            <h4>Bollinger Up :</h4>
            <p> <input type="text" name="bollUp" id="bollUp"/> </p>
          </div>
          <div>
            <h4>Bollinger Down :</h4>
            <p> <input type="text" name="bollDown" id="bollDown"/> </p>
          </div>
          <div>
            <h4>ADX &gt; 25 :</h4>
            <p> <input type="text" name="adxUp" id="adxUp"/> </p>
          </div>
          <div>
            <h4>Crosses 50-Day :</h4>
            <p> <input type="text" name="cross50" id="cross50"/> </p>
          </div>
          <div>
            <h4>Crosses 100-Day :</h4>
            <p> <input type="text" name="cross100" id="cross100"/> </p>
          </div>
          <div>
            <h4>Crosses 200-Day :</h4>
            <p> <input type="text" name="cross200" id="cross200"/> </p>
          </div>
          <div>
            <h4>Bollinger Range :</h4>
            <p> <input type="text" name="bollRange" id="bollRange"/> </p>
          </div>
          <div>
            <h4>ADX &lt; 25 :</h4>
            <p> <input type="text" name="adxDown" id="adxDown"/> </p>
          </div>
          <div>
            <h4>RSI &gt; 80 :</h4>
            <p> <input type="text" name="rsiUp" id="rsiUp"/> </p>
          </div>
          <div>
            <h4>RSI &lt; 80 :</h4>
            <p> <input type="text" name="rsiDown" id="rsiDown"/> </p>
          </div>
          <div>
            <h4>Stochastics &lt; 70 :</h4>
            <p> <input type="text" name="stochasticsUp" id="stochasticsUp"/> </p>
          </div>
          <div>
            <h4>Stochastics &lt; 30 :</h4>
            <p> <input type="text" name="stochasticsDown" id="stochasticsDown"/> </p>
          </div>
        </CheckList>
        <CheckList>
          <h3>Trades I'm Waiting For</h3>
          <div>
            <h4>DATE :</h4>
            <p><input type="text" name="date" id="date"/></p>
          </div>
          <div>
            <h4>BUY/SELL :</h4>
            <p><input type="text" name="buySell" id="buySell"/></p>
          </div>
          <div>
            <h4>STOP :</h4>
            <p><input type="text" name="stop" id="currency"/></p>
          </div>
          <div>
            <h4>TARGET 1 :</h4>
            <p><input type="text" name="targetOne" id="targetOne"/></p>
          </div>
          <div>
            <h4>TARGET 2 :</h4>
            <p><input type="text" name="targetTwo" id="targetTwo"/></p>
          </div>
          <div>
            <h4>TARGET 3 :</h4>
            <p><input type="text" name="targetThree" id="targetThree"/></p>
          </div>
          <div>
            <h4>INDICATOR :</h4>
            <p><input type="text" name="indicator" id="indicator"/></p>
          </div>
          <div>
            <h4>RESULTS :</h4>
            <p><input type="text" name="results" id="results"/></p>
          </div>
          <div>
            <h4>COMMENTS :</h4>
            <p><textarea type="textarea" name="comments" id="comments" cols="30" rows="10"/></p>
          </div>
        </CheckList>
      </JournalBody>
      <History>
        <h3>Trade History</h3>
      </History>
    </JournalWrapper>
  )
}

export default Journal
