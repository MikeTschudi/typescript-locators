import {IItemTemplate, ISavedItemTemplate} from '../interfaces';

export function templatize(itemTemplate:IItemTemplate):Promise<IItemTemplate> {
  itemTemplate.resources = ['webmap.png'];
  itemTemplate.key = "aWebmap";
  return Promise.resolve(itemTemplate);
}

export function save(itemTemplate:IItemTemplate, title:string):Promise<ISavedItemTemplate> {
  console.log("save webmap: " + JSON.stringify(itemTemplate,null,2));//???
  return Promise.resolve({
    success:true,
    label:title,
    template:itemTemplate
  });
}