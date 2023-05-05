export function getIconSrc(weathercode: number) {
  let iconSrc = '';

  if (weathercode === 0) {
    iconSrc = 'sun.png';
  } else if (weathercode === 1 || weathercode === 2) {
    iconSrc = 'partly-cloudy-day.png';
  } else if (weathercode === 3) {
    iconSrc = 'cloud.png';
  } else if (weathercode === 45 || weathercode === 48) {
    iconSrc = 'fog.png';
  } else if (weathercode === 51 || weathercode === 53 || weathercode === 55) {
    iconSrc = 'light-rain.png';
  } else if (weathercode === 56 || weathercode === 57) {
    iconSrc = 'light-snow.png';
  } else if (weathercode === 61) {
    iconSrc = 'light-rain.png';
  } else if (weathercode === 63) {
    iconSrc = 'rain.png';
  } else if (weathercode === 65) {
    iconSrc = 'heavy-rain.png';
  } else if (weathercode === 66 || weathercode === 67) {
    iconSrc = 'sleet.png';
  } else if (weathercode === 71) {
    iconSrc = 'light-snow.png';
  } else if (weathercode === 73 || weathercode === 75) {
    iconSrc = 'snow.png';
  } else if (weathercode === 77) {
    iconSrc = 'light-snow.png';
  } else if (weathercode === 80 || weathercode === 81 || weathercode === 82) {
    iconSrc = 'torrential-rain.png';
  } else if (weathercode === 85 || weathercode === 86) {
    iconSrc = 'snow-storm.png';
  } else if (weathercode === 95) {
    iconSrc = 'storm.png';
  } else if (weathercode === 96 || weathercode === 99) {
    iconSrc = 'hail.png';
  }

  return iconSrc;
}
