export interface IItem {
  item: any,
  data?: any
}

export interface IItemTemplate extends IItem{
  type: string,
  resources?: any
}

export interface ISavedItemTemplate {
  success: Boolean,
  label: string,
  template: IItemTemplate
}
