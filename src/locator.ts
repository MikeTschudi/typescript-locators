import {IItemBase} from './interfaces';
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

export function locator(type:string) {
  let item:IItemBase = {
    type: type,
    fcns: moduleMap[type.toLowerCase()] || GenericModule
  };

  /*
  switch(type.toLowerCase()) {
    case 'web map':
      item.fcns = WebMapModule;
      break;
    case 'dashboard':
      item.fcns = DashboardModule;
      break;
  }
  */

  return item;
}
