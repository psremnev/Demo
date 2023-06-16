/**
 * @class Marker
 * @description Маркер
 */
export default function Marker({ checked }) {
  const style = {
    borderRadius: '50%',
    height: 10,
    width: 10
  };
  return (
    <div
      style={checked ? { ...style, background: 'var(--mark_color)' } : style}
    />
  );
}
