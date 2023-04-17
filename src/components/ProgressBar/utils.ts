import moment from 'moment';

moment.locale('en');

export const getValues = () => {
  const date = moment();
  const day = parseInt(date.format('DD'), 10);
  const nameOfDay = date.format('ddd');
  const month = parseInt(date.format('MM'), 10);
  const nameOfMonth = date.format('MMMM');
  const year = parseInt(date.format('YYYY'), 10);
  const hours = parseInt(date.format('HH'), 10);
  const minutes = parseInt(date.format('mm'), 10);
  const seconds = parseInt(date.format('ss'), 10);
  const milliseconds = parseInt(date.format('SSS'), 10);
  const yearStart = moment([year, 0, 1]);
  const daysInYear = moment([year, 11, 31]).diff(yearStart, 'days') + 1;
  const dayCount = date.diff(yearStart, 'days') + 1;
  const perMilliSec = dayCount * 24 * 60 * 60 * 1000
    + hours * 60 * 60 * 1000
    + minutes * 60 * 1000
    + seconds * 1000 + milliseconds;
  const full = 365 * 24 * 60 * 60 * 1000;
  const progress = perMilliSec / full * 100;
  const progressFull = progress.toFixed(7);
  const progressShort = progressFull.toString().slice(0, (progressFull.indexOf('.') + 3));

  return {
    date,
    day,
    nameOfDay,
    month,
    year,
    hours,
    minutes,
    seconds,
    milliseconds,
    dayCount,
    daysInYear,
    nameOfMonth,
    progress,
    progressFull,
    progressShort,
  };
};
