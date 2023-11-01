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
        cursor: 'pointer',
        color: 'var(--default_text_color)'
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
  onItemClick,
  backgroundColor
}) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        padding: 20,
        boxSizing: 'border-box',
        background: backgroundColor
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          color: 'var(--default_text_color)'
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
