export interface IItemProcessor {
  templatize(item:IItem): Promise<IItemTemplate>;
  save(item:IItem): Promise<any>; //any just to keep this simple
}

export interface IItem {
  item: any,
  data?: any
}

export interface IItemTemplate extends IItem{
  type: string,
  resources?: any
}
