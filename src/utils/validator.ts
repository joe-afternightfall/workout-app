const REPS_REG_EX = new RegExp('^[0-9]*$');
// const REPS_REG_EX = new RegExp('^[1-9][.d]?$');

export const validateReps = (value: string): boolean => {
  return REPS_REG_EX.test(value);
};
