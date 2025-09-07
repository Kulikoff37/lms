import { TMenuItem } from "@/types/menu";


export const DEFAULT_MENU_ITEM = ['/']

export const MENU_ITEMS: TMenuItem[] = [
  {
    label: 'Тестирование',
    key: '/'
  },
  {
    label: 'Редактор',
    key: '/editor'
  }
]

export enum Links {
  Testing = '/',
  Editor = '/editor',
}
