import { getFormatDateValue } from "./getFormatDateValue";

export const getDuration = (timeInSec) => {
  if (!timeInSec) {
    return '00:00';
  }
  const timeRound = Math.round(timeInSec);
  const min = String(timeRound / 60).split('.')[0];
  const sec =
    timeRound < 60 ? String(timeRound) : String(timeRound % 60).split('.')[0];
  return `${getFormatDateValue(min)}:${getFormatDateValue(sec)}`;
};