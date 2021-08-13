import safeRegex from 'safe-regex';
const SLASHES_REGEX = new RegExp(/\//g);

export const formatBirthday = (val: string): string => {
  let numberOfSlashes = getNumberOfSlashes(val);
  while (numberOfSlashes >= 3) {
    val =
      val.slice(0, indexOfLastSlash(val)) +
      val.slice(indexOfLastSlash(val) + 1, val.length);
    numberOfSlashes = getNumberOfSlashes(val);
  }

  const dateRegex = /([0-9]{0,2})\/([0-9]{0,2})\/([0-9]{0,4})/;
  const monthDayRegex = /([0-9]{0,2})\/([0-9]{0,2}).*/;

  let month = '';
  let day = '';
  let year = '';

  let match;

  switch (numberOfSlashes) {
    case 0:
      month = val.substring(0, 2);
      day = val.substring(2, 4);
      year = val.substring(4);
      break;
    case 1:
      if (safeRegex(monthDayRegex)) {
        match = val.match(monthDayRegex);
        if (match) {
          month = match[1];
          day = match[2];
          year = val.substring(indexOfLastSlash(val) + 3);
        }
      }
      break;
    case 2:
      if (safeRegex(monthDayRegex)) {
        match = val.match(dateRegex);
        if (match) {
          month = match[1];
          day = match[2];
          year = match[3];
        }
      }
      break;
  }

  return (
    month +
    (day.length ? '/' + day : year.length ? '/' : '') +
    (year.length ? '/' + year : '')
  );
};

export const isValidDate = (val: string): boolean => {
  const strippedValue = val.replace(SLASHES_REGEX, '');

  if (strippedValue.length !== 8) {
    return false;
  }

  const year: number = parseInt(strippedValue.substring(4, 8));
  const month: number = parseInt(strippedValue.substring(0, 2)) - 1;
  const day: number = parseInt(strippedValue.substring(2, 4));

  const date: Date = new Date();
  date.setFullYear(year, month, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day &&
    date.getTime() < Date.now() &&
    date.getFullYear() >= 1900
  );
};

export const didNotDeleteSlash = (oldVal: string, newVal: string): boolean => {
  const oldNumberSlashes = (oldVal.match(SLASHES_REGEX) || []).length;
  const newNumberSlashes = (newVal.match(SLASHES_REGEX) || []).length;
  return oldNumberSlashes <= newNumberSlashes;
};

const getNumberOfSlashes = (val: string): number => {
  return (val.match(SLASHES_REGEX) || []).length;
};

const indexOfLastSlash = (val: string): number => {
  return val.lastIndexOf('/');
};
