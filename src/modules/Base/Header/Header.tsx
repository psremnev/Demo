import { IHeader } from 'Header/IHeader';

/**
 * @link Header/Header
 * @description Заголовок
 */

export default function Header({
  title,
  size = 20,
  color = 'var(--header_color)',
}: IHeader) {
  return (
    <span
      style={{
        fontSize: size,
        color,
        fontFamily: 'monospace',
        fontWeight: 'bold',
      }}
    >
      {title}
    </span>
  );
}
