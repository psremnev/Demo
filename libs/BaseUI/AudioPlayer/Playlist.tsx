import { List } from 'list';
import { useMemo } from 'react';

const Item = ({ item, activeId, idProperty, titleProperty }) => {
  const isActive = useMemo(() => activeId === item[idProperty], []);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        background: isActive ? '#e7e7e7' : 'transparent',
        padding: 6,
        boxSizing: 'border-box',
        borderRadius: 6,
        cursor: 'pointer'
      }}
    >
      <div>{item[titleProperty]}</div>
      <div>{item.duration}</div>
    </div>
  );
};

/**
 * @link AudioPlayer/Playlist
 * @description Плейлист для Аудио Плеера
 */

export default function Playlist({
  source = [],
  idProperty,
  titleProperty,
  activeId,
  onItemClick
}) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        padding: 20,
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <div>Name</div>
        <div>Duration</div>
      </div>
      <List
        onItemClick={onItemClick}
        items={source}
        itemTemplate={(props) => (
          <Item {...{ ...props, activeId, idProperty, titleProperty }} />
        )}
      />
    </div>
  );
}
