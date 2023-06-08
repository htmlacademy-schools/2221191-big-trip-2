const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getRandomElement = (elements) => {
  const MIN = 0;
  const max = elements.length - 1;
  return elements[getRandomInteger(MIN, max)];
};

const capitalizeValue = (value) => {
  if (value === false) {
    return '';
  }

  const capFirstValue = value[0].toUpperCase();
  const restOfValue = value.slice(1);
  return capFirstValue + restOfValue;
};

export { getRandomInteger, getRandomElement, capitalizeValue };
