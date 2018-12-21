export interface IItem {
  item: any,
  data?: any
}

export interface IItemTemplate extends IItem {
  type: string,
  key?: string,
  resources?: any,
  fcns?: IItemTypeModule
}

export interface ISavedItemTemplate {
  success: Boolean,
  label: string,
  template: IItemTemplate
}

export interface IItemTypeModule {
  templatize(itemTemplate:IItemTemplate): Promise<IItemTemplate>;
  save(itemTemplate:IItemTemplate, title:string): Promise<ISavedItemTemplate>;
}
