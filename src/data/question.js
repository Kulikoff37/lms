export const subjects = [
  {
    id: 1,
    name: 'biology',
    label: 'Биология',
  },
  {
    id: 2,
    name: 'chemistry',
    label: 'Химия',
  }
]

export const types = [
  {
    id: 1,
    name: 'single',
    label: 'Один ответ',
  },
  {
    id: 2,
    name: 'multiple',
    label: 'Много ответов',
  }
]

export const sections = [
  {
    id: 1,
    parentId: null,
    name: 'Биология – наука о живой природе. Методы научного познания',
    docId: '1'
  },
  {
    id: 2,
    parentId: 1,
    name: 'Понятие о жизни. Признаки живого (клеточное строение, питание, дыхание, выделение, рост и др.). Объекты живой и неживой природы, их сравнение. Живая и неживая природа – единое целое',
    docId: '1.1'
  },
  {
    id: 3,
    parentId: 1,
    name: 'Понятие о жизни. Признаки живого (клеточное строение, питание, дыхание, выделение, рост и др.). Объекты живой и неживой природы, их сравнение. Живая и неживая природа – единое целое',
    docId: '1.2'
  }
]


export const questions = [
  {
    text: '',
    subjectId: 1,
    typeId: 1,
    sectionId: 1,
  }
]
