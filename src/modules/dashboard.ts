import {IItemBase, IItem, IItemTemplate, ISavedItemTemplate} from '../interfaces';

export function templatize(base:IItemBase, item:IItem):Promise<IItemTemplate> {
  const tmpl = {...base, ...item} as IItemTemplate;
  tmpl.resources = ['dashboard.png'];
  console.log("templatized dashboard: " + JSON.stringify(base,null,2));//???
  return Promise.resolve(tmpl);
}

export function save(tmpl:IItemTemplate, title:string):Promise<ISavedItemTemplate> {
  console.log("save dashboard...");//???
  return Promise.resolve({
    success:true,
    label:title,
    template:tmpl
  });
}