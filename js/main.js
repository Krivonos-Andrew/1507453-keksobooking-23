const getRandomFloat = (min, max, countDec) => {
  if (min === max) {
    return 0;
  }
  const minValue = Math.min(min, max);
  const maxValue = Math.max(min, max);
  const rangeValue = Math.random() * (maxValue - minValue) + minValue;
  return rangeValue.toFixed(countDec);
};


const getRandomInRange = (min, max) => {
  if (min === max) {
    return 0;
  }
  const minValue = Math.min(min, max);
  const maxValue = Math.max(min, max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

getRandomFloat(1, 2);
getRandomInRange();
