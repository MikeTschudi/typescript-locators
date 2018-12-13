import {IItem, IItemTemplate, ISavedItemTemplate} from '../interfaces';

export function templatize(item:IItem):Promise<IItemTemplate> {
  const tmpl = {...item} as IItemTemplate;
  tmpl.resources = ['webmap.png']
  return Promise.resolve(tmpl);
}

export function save(tmpl:IItemTemplate, title:string):Promise<ISavedItemTemplate> {
  return Promise.resolve({
    success:true,
    label:title,
    template:tmpl
  });
}