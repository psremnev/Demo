export const getFormatDateValue = (value) => {
  return String(value).length > 1 ? value : `0${value}`;
};