import { useEffect, useState } from 'react';
import './AudioPlayer.scss';

const createAudio = (params) => {
  const { source, volume, sourcePositionStart } = params;
  const audio = new Audio();
  audio.src = source[sourcePositionStart];
  audio.volume = volume / 100;
  return audio;
};

const getFormatDateValue = (value) => {
  return String(value).length > 1 ? value : `0${value}`;
};

const getDuration = (timeInSec) => {
  if (!timeInSec) {
    return '00:00';
  }
  const timeRound = Math.round(timeInSec);
  const min = String(timeRound / 60).split('.')[0];
  const sec =
    timeRound < 60 ? String(timeRound) : String(timeRound % 60).split('.')[0];
  return `${getFormatDateValue(min)}:${getFormatDateValue(sec)}`;
};

export default function AudioPlayer({
  source = [],
  sourcePositionStart = 0,
  volume = 30
}) {
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
    setAudio(createAudio({ source, volume, sourcePositionStart }));
  }, []);

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

  const onPlay = (e) => {
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
      setAudio(createAudio({ source, volume, sourcePositionStart: newPos }));
    }
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
    <div className="audioPlayer">
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
          background: `linear-gradient(to right, #956aff 0%, #956aff ${procentProgress}%, #fff ${procentProgress}%, white 100%)`
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
