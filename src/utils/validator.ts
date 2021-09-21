const REPS_REG_EX = new RegExp('^[0-9]*$');
// const REPS_REG_EX = new RegExp('^[1-9][.d]?$');
const WEIGHTS_REG_EX = new RegExp(/^\d*\.?\d*$/);

export const validateReps = (value: string): boolean => {
  return REPS_REG_EX.test(value);
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
