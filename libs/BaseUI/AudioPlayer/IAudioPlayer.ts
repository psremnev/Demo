export interface IAudioPlayer {
  /* список треков
     примерный формат { id: 2, title: '2', link: 'public/2.mp3', duration: '02:14' }
  */
  source: [];
  // названия поля в котором хранится ид трека
  idProperty: string | number;
  // названия поля в котором хранится название трека
  titleProperty: string;
  // названеи поля которое содержит ссылку на файл
  linkProperty: string;
  // c плейлистом или нет
  hasPlaylist: boolean;
  // номер трека из списка который будет инициализирован
  sourcePositionStart: number;
  // уровень звука
  volume: number;
  // цвет полосы прогресса в формате CSS
  sliderColor: string;
  // цвет фона в формате CSS
  backgroundColor: string;
  // цвет границы в формате CSS
  borderColor: string;
  // радиус границы
  borderRadius: number;
  // показать плейлист
  showPlaylist: boolean;
  // коллбек при смене позиции трека
  onPositionChange: Function;
  // активный элемент списка
  activeItem: object;
}
