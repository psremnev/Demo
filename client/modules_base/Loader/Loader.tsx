/**
 * @class Loader
 * @description Лоадер
 */
export default function Loader() {
  return (
    <div style={ {
      display: 'flex',
      justifyContent: 'center'
    } }>
      <img
        style={{ height: 30, alignSelf: 'center', justifySelf: 'center' }}
        src="public/loader.gif"
      />
    </div>
  );
}
