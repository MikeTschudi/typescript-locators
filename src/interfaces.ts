export interface IItemProcessor {
  templatize(item:IItem): Promise<IItemTemplate>;
}

export interface IItem {
  item: any,
  data?: any
}

export interface IItemTemplate extends IItem{
  type: string,
  resources?: any
}
