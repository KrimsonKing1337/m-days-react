export function getIconSrc(weathercode: number) {
  let iconSrc = '999.svg';

  if (weathercode === 0) {
    iconSrc = '100.svg';
  } else if (weathercode === 1) {
    iconSrc = '102.svg';
  } else if (weathercode === 2) {
    iconSrc = '101.svg';
  } else if (weathercode === 3) {
    iconSrc = '104.svg';
  } else if (weathercode === 45) {
    iconSrc = '500.svg';
  } else if (weathercode === 48) {
    iconSrc = '501.svg';
  } else if (weathercode === 51) {
    iconSrc = '309.svg';
  } else if (weathercode === 53) {
    iconSrc = '311.svg';
  } else if (weathercode === 55) {
    iconSrc = '312.svg';
  } else if (weathercode === 56 || weathercode === 57) {
    iconSrc = '309.svg';
  } else if (weathercode === 61) {
    iconSrc = '305.svg';
  } else if (weathercode === 63) {
    iconSrc = '306.svg';
  } else if (weathercode === 65) {
    iconSrc = '307.svg';
  } else if (weathercode === 66 || weathercode === 67) {
    iconSrc = '405.svg';
  } else if (weathercode === 71) {
    iconSrc = '400.svg';
  } else if (weathercode === 73) {
    iconSrc = '401.svg';
  } else if (weathercode === 75) {
    iconSrc = '402.svg';
  } else if (weathercode === 77) {
    iconSrc = '400.svg';
  } else if (weathercode === 80) {
    iconSrc = '300.svg';
  } else if (weathercode === 81 || weathercode === 82) {
    iconSrc = '301.svg';
  } else if (weathercode === 85 || weathercode === 86) {
    iconSrc = '407.svg';
  } else if (weathercode === 95) {
    iconSrc = '302.svg';
  } else if (weathercode === 96 || weathercode === 99) {
    iconSrc = '304.svg';
  }

  return iconSrc;
}
