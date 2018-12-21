export interface IItem {
  item: any,
  data?: any
}

export interface IItemTemplate extends IItem {
  type: string,
  key?: string,
  resources?: any,
  fcns?: any
}

export interface ISavedItemTemplate {
  success: Boolean,
  label: string,
  template: IItemTemplate
}
