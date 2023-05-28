/**
 * Вернет строку цвет в формате rgba
 * @param id ид записи
 * @returns String CSS Color format
 */
export const getBackgroundColor: (id: string) => string = (id: string) => {
  const length = id.length;
  const firstThreeChar = id.slice(length - 4, length - 1);
  const secondThreeChar = id.slice(length - 8, length - 5);
  const firstColor = `rgba(${firstThreeChar.charCodeAt(
    2
  )}, ${firstThreeChar.charCodeAt(1)},${firstThreeChar.charCodeAt(0)})`;
  const secondColor = `rgba(${secondThreeChar.charCodeAt(
    2
  )}, ${secondThreeChar.charCodeAt(1)}, ${secondThreeChar.charCodeAt(0)})`;
  return `linear-gradient(to left, ${firstColor}, ${secondColor})`;
};
