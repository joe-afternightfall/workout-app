const WEIGHTS_REG_EX = new RegExp(/^\d*\.?\d*$/);

export const isOdd = (value: number): boolean => {
  return value % 2 === 1;
};

export const validateWeight = (value: string): boolean => {
  return WEIGHTS_REG_EX.test(value);
};

export const trimLeadingZeros = (value: string): string => {
  let valueCopy = value;
  if (valueCopy === '') {
    return '0';
  } else if (valueCopy.length > 1) {
    while (valueCopy.charAt(0) === '0') {
      valueCopy = valueCopy.substring(1);
    }
  }
  return valueCopy;
};

export const getMinutesBetweenDates = (
  startDate: string,
  endDate: string
): string => {
  const diff =
    new Date(Number(endDate)).getTime() - new Date(Number(startDate)).getTime();
  return (diff / 60000).toFixed();
};
