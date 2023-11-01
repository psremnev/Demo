import { IHeader } from 'Header/IHeader';

/**
 * @link Header/Header
 * @description Заголовок
 */

export default function Header({
  title,
  size = 20,
  color = 'inherit'
}: IHeader) {
  return (
    <span
      style={{
        fontSize: size,
        fontFamily: 'monospace',
        fontWeight: 'bold'
      }}
    >
      {title}
    </span>
  );
}
