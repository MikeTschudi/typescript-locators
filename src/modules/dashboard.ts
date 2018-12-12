import {IItem, IItemTemplate} from '../interfaces';

export function templatize(item:IItem) {
  const tmpl = {...item} as IItemTemplate;
  tmpl.resources = ['dashboard.png']
  return Promise.resolve(tmpl);
}

export function save(item:IItem) {
  return Promise.resolve({success:true});
}