
const formatPairName = (pair) => {

  const switchPairs = (pair) => {
    var changedPair = pair
    switch(changedPair){
      case "USDEUR": 
        changedPair = "EURUSD";
        break;
      case "USDGBP": 
        changedPair = "GBPUSD";
        break;
      default: changedPair = pair
    }
    return changedPair
  }

  const pairOne = pair.split(" ")[0];
  const pairTwo = pair.split(" ")[1];

  return switchPairs(pairOne) + " & " + switchPairs(pairTwo);
}

export default formatPairName
