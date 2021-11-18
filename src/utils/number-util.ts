export const isOdd = (value: number): boolean => {
  return value % 2 === 1;
};

export const getMinutesBetweenDates = (
  startDate: string,
  endDate: string
): string => {
  const diff =
    new Date(Number(endDate)).getTime() - new Date(Number(startDate)).getTime();
  return (diff / 60000).toFixed();
};
