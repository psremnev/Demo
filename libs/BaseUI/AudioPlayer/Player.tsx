import { useEffect, useState } from 'react';
import { getDuration } from './getDuration';
import { IAudioPlayer } from './IAudioPlayer';

const createAudio = (params) => {
  const { activeItem, volume, linkProperty } = params;
  const audio = new Audio();
  audio.src = activeItem[linkProperty];
  audio.volume = volume / 100;
  return audio;
};

export default function Player({
  source,
  idProperty,
  linkProperty,
  sourcePositionStart,
  volume,
  sliderColor,
  backgroundColor,
  borderRadius,
  onPositionChange,
  activeItem
}: Partial<IAudioPlayer>) {
  const [audio, setAudio] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [duration, setDuration] = useState(getDuration(null));
  const [progress, setProgress] = useState(0);
  const [max, setMax] = useState(0);
  const [procentProgress, setProcentProgress] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [thisVolume, setThisVolume] = useState(volume);
  let [position, setPosition] = useState(sourcePositionStart);
  const [hasNext, setHasNext] = useState(
    source.length - 1 > sourcePositionStart
  );
  const [hasPrev, setHasPrev] = useState(sourcePositionStart > 0);
  const [needPlay, setNeedPlay] = useState(false);

  useEffect(() => {
    setAudio(
      createAudio({
        activeItem,
        volume,
        linkProperty
      })
    );
  }, []);

  useEffect(() => {
    if (activeItem && activeItem[idProperty] !== source[position][idProperty])
      onPlayListItemClick(activeItem);
  }, [activeItem]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener('timeupdate', onPlay);
      audio.addEventListener('ended', onNavBtnClick);
      setProcentProgress(0);
      if (needPlay) audio.play();
      return () => {
        audio.pause();
        audio.removeEventListener('timeupdate', onPlay);
      };
    }
  }, [audio]);

  const onPlay = () => {
    setMax(audio.duration);
    setProgress(audio.currentTime);
    setProcentProgress((audio.currentTime / audio.duration) * 100);
    setDuration(getDuration(audio.currentTime));
  };

  const onPlayBtnClick = () => {
    isPlay ? audio.pause() : audio.play();
    setIsPlay(!isPlay);
  };

  const onNavBtnClick = (forward = true) => {
    const newPos = forward ? ++position : --position;
    if (newPos >= 0 && newPos < source.length) {
      setNeedPlay(true);
      setPosition(newPos);
      setAudio(
        createAudio({
          activeItem: source[newPos],
          volume,
          linkProperty
        })
      );
    }
    setHasNext(source.length - 1 > newPos);
    setHasPrev(newPos > 0);
    isPlay ? null : setIsPlay(true);
    onPositionChange && onPositionChange(newPos);
  };

  const onPlayListItemClick = (item) => {
    const newPos = source.findIndex(
      (el) => el[idProperty] === item[idProperty]
    );
    setNeedPlay(true);
    setPosition(newPos);
    setAudio(
      createAudio({
        activeItem: source[newPos],
        volume,
        sourcePositionStart: newPos,
        linkProperty
      })
    );
    setHasNext(source.length - 1 > newPos);
    setHasPrev(newPos > 0);
    isPlay ? null : setIsPlay(true);
  };

  const onSliderChange = (e) => {
    audio.currentTime = e.target.value;
    if (!isPlay) {
      audio.play();
      setIsPlay(!isPlay);
    }
  };

  const onVolumeChange = (e) => {
    e.stopPropagation();
    const value = Number(e.target.value);
    setThisVolume(value);
    audio.volume = value / 100;
  };

  return (
    <div
      className="audioPlayer"
      style={{
        background: backgroundColor,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius
      }}
    >
      <span className="audioPlayer__duration">{duration}</span>
      <div
        className={`audioPlayer__prevBtn ${
          hasPrev ? '' : 'audioPlayer__disabled'
        }`}
        onClick={() => onNavBtnClick(false)}
      />
      <div
        className={`audioPlayer__playBtn ${isPlay ? 'pause' : 'play'}`}
        onClick={onPlayBtnClick}
      >
        <span className="left"></span>
        {isPlay ? <span className="right"></span> : null}
      </div>
      <div
        className={`audioPlayer__nextBtn ${
          hasNext ? '' : 'audioPlayer__disabled'
        }`}
        onClick={() => onNavBtnClick(true)}
      />
      <input
        className="audioPlayer__slider"
        style={{
          background: `linear-gradient(to right, ${sliderColor} ${procentProgress}%, #e9e9e9 ${procentProgress}%)`
        }}
        type="range"
        value={progress}
        min="0"
        max={max}
        onChange={onSliderChange}
      />
      <div
        className="audioPlayer__volume"
        onMouseEnter={() => setShowVolume(true)}
      >
        <div className="audioPlayer__volumeIcon" />
        {showVolume ? (
          <div
            className="audioPlayer__volumeWrapper"
            onMouseLeave={(e) => setShowVolume(false)}
          >
            <input
              className="audioPlayer__slider"
              type="range"
              value={thisVolume}
              min="0"
              max={100}
              onChange={onVolumeChange}
            />
          </div>
        ) : null}
      </div>
      <div className="audioPlayer__download" style={{ position: 'relative' }}>
        <div className="audioPlayer__downloadIcon" />
        <a href={source} download />
      </div>
    </div>
  );
}
