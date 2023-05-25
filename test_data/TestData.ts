export const listData = [
  {
    id: 1,
    title: 'Кошка',
    link: 'https://w.forfun.com/fetch/70/7047b702475924ba8f8044b5b5ca56ba.jpeg',
  },
  {
    id: 2,
    title: 'Собака',
    link: 'https://webpulse.imgsmail.ru/imgpreview?key=pulse_cabinet-image-389e1a1a-0cd6-4083-8f66-1e2660042ae3&mb=webpulse',
  },
  {
    id: 3,
    title: 'Обезьяна',
    link: 'https://rt-online.ru/wp-content/uploads/2022/01/obezyana.jpg',
  },
  {
    id: 4,
    title: 'Носорог',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Rhino_collage.png/800px-Rhino_collage.png',
  },
  {
    id: 5,
    title: 'Крокодил',
    link: 'https://bigasia.ru/upload/resize_cache/iblock/31b/800_600_1/31bdc0b428f667d727525d8166a3d99f.jpg',
  },
];

export const treeData = [
  { id: 1, title: 'Кошка', parent: null, hasChildren: true },
  { id: 2, title: 'Собака', parent: null, hasChildren: true },
  { id: 2, title: 'Попугай', parent: null, hasChildren: false },
  { id: 3, title: 'Обезьяна', parent: 2, hasChildren: false },
  { id: 4, title: 'Носорог', parent: 1, hasChildren: true },
  { id: 5, title: 'Крокодил', parent: 2, hasChildren: false },
  { id: 6, title: 'Мышь', parent: 4, hasChildren: false },
  { id: 7, title: 'Леопард', parent: null, hasChildren: true },
  { id: 8, title: 'Кенгуру', parent: null, hasChildren: false },
  { id: 9, title: 'Лев', parent: null, hasChildren: false },
  { id: 10, title: 'Волк', parent: 7, hasChildren: false },
];
