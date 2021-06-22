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

const getRandomItem = (items) => items[getRandomInRange(0, items.length - 1)];

const getRandomItems = (items) => {
  const itemCount = getRandomInRange(0, items.length - 1);
  const result = [];

  while (result.length - 1 < itemCount) {
    const randomItem = getRandomItem(items);
    if (!result.includes(randomItem)) {
      result.push(randomItem);
    }
  }
  return result;
};

export {
  getRandomFloat,
  getRandomInRange,
  getRandomItem,
  getRandomItems
};
