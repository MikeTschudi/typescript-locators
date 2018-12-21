import {IItem, IItemTemplate} from './interfaces';
import * as WebMapModule from './modules/webmap';
import * as DashboardModule from './modules/dashboard';
import * as GenericModule from './modules/generic';

interface IModuleMap {
  [itemType: string]: any;
}

const moduleMap:IModuleMap = {
  'web map': WebMapModule,
  'dashboard': DashboardModule
};

export function locator(model:IItem):IItemTemplate {
  return {
    type: model.item.type,
    fcns: moduleMap[model.item.type.toLowerCase()] || GenericModule,
    ...model
  };
}
