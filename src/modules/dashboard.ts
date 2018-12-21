import {IItemTemplate, ISavedItemTemplate} from '../interfaces';

export function templatize(itemTemplate:IItemTemplate):Promise<IItemTemplate> {
  itemTemplate.resources = ['dashboard.png'];
  itemTemplate.key = "aDashboard";
  return Promise.resolve(itemTemplate);
}

export function save(itemTemplate:IItemTemplate, title:string):Promise<ISavedItemTemplate> {
  console.log("save dashboard: " + JSON.stringify(itemTemplate,null,2));//???
  return Promise.resolve({
    success:true,
    label:title,
    template:itemTemplate
  });
}
