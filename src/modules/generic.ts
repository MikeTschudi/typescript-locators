import {IItemTemplate, ISavedItemTemplate} from '../interfaces';

export function templatize(itemTemplate:IItemTemplate):Promise<IItemTemplate> {
  itemTemplate.key = "aGeneric";
  return Promise.resolve(itemTemplate);
}

export function save(itemTemplate:IItemTemplate, title:string):Promise<ISavedItemTemplate> {
  console.log("save generic: " + JSON.stringify(itemTemplate,null,2));//???
  return Promise.resolve({
    success:true,
    label:title,
    template:itemTemplate
  });
}
