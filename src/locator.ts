import * as WebMapModule from './modules/webmap';
import * as DashboardModule from './modules/dashboard';

export function locator(type:string) {
  switch(type.toLowerCase()) {
    case 'web map':
      return WebMapModule;
    case 'dashboard':
      return DashboardModule;
    default:
      return
  }
}
