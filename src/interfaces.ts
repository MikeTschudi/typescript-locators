export interface IItemBase {
  type: string,
  fcns?: any
}

export interface IItem {
  item: any,
  data?: any
}

export interface IItemTemplate extends IItemBase, IItem {
  resources?: any
}

export interface ISavedItemTemplate {
  success: Boolean,
  label: string,
  template: IItemTemplate
}
