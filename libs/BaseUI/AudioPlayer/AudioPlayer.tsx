import { useState } from 'react';
import Player from './Player';
import Playlist from './Playlist';
import './AudioPlayer.scss';
import { IAudioPlayer } from './IAudioPlayer';

function AudioPlayer(props: IAudioPlayer) {
  const [showPlaylist, setShowPlaylist] = useState(props.showPlaylist);
  const [activeItem, setActiveItem] = useState(
    props.source.length > 0 && props.source[props.sourcePositionStart]
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid  ${props.borderColor}`,
        borderRadius: props.borderRadius,
        background: props.backgroundColor
      }}
    >
      <div
        style={{
          display: 'flex',
          padding: '0px 20px',
          alignItems: 'center'
        }}
      >
        <Player
          {...props}
          onPositionChange={(pos) => setActiveItem(props.source[pos])}
          activeItem={activeItem}
        />
        {props.hasPlaylist ? (
          <div
            className={`${
              showPlaylist
                ? 'audioPlayer__playlistToggleOn'
                : 'audioPlayer__playlistToggleOff'
            }`}
            onClick={() => setShowPlaylist(!showPlaylist)}
          />
        ) : null}
      </div>

      {props.hasPlaylist && showPlaylist ? (
        <Playlist
          onItemClick={setActiveItem}
          activeId={activeItem[props.idProperty]}
          idProperty={props.idProperty}
          titleProperty={props.titleProperty}
          source={props.source}
          backgroundColor={props.backgroundColor}
        />
      ) : null}
    </div>
  );
}

AudioPlayer.defaultProps = {
  source: [],
  idProperty: 'id',
  titleProperty: 'title',
  linkProperty: 'link',
  hasPlaylist: true,
  sourcePositionStart: 0,
  volume: 30,
  sliderColor: '#fee7b1',
  backgroundColor: '#ffffff',
  borderColor: '#dedede',
  borderRadius: 6,
  showPlaylist: false,
  onPositionChange: null
};

export default AudioPlayer;
