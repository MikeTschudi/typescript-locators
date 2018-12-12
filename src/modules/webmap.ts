import {IItem, IItemTemplate} from '../interfaces';
export function templatize(item:IItem) {
  const tmpl = {...item} as IItemTemplate;
  tmpl.resources = ['webmap.png']
  return Promise.resolve(tmpl);
}