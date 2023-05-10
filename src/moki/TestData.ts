export const listData = [
    {id: 1, title: 'Кошка'},
    {id: 2, title: 'Собака'},
    {id: 3, title: 'Обезьяна'},
    {id: 4, title: 'Носорог'},
    {id: 5, title: 'Крокодил'}
]

export const treeData = [
    {id: 1, title: 'Кошка', parent: null, hasChildren: true},
    {id: 2, title: 'Собака', parent: null, hasChildren: true},
    {id: 2, title: 'Попугай', parent: null, hasChildren: false},
    {id: 3, title: 'Обезьяна', parent: 2, hasChildren: false},
    {id: 4, title: 'Носорог', parent: 1, hasChildren: true},
    {id: 5, title: 'Крокодил', parent: 2, hasChildren: false},
    {id: 6, title: 'Мышь', parent: 4, hasChildren: false},
    {id: 7, title: 'Леопард', parent: null, hasChildren: true},
    {id: 8, title: 'Кенгуру', parent: null, hasChildren: false},
    {id: 9, title: 'Лев', parent: null, hasChildren: false},
    {id: 10, title: 'Волк', parent: 7, hasChildren: false}
]