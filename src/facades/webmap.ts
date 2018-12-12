
import {IItemProcessor, IItem, IItemTemplate} from '../interfaces';
import * as WebMapModule from '../modules/webmap';

/**
 * Class that implements an interface, but simply delegates all calls to
 * functions imported from a module.
 * This pattern allows other consumers to import functions as needed while
 * still affording the Solution Bundle system the use of Interfaces to
 * enforce behavior
 */
export default class WebMapProcessor implements IItemProcessor {
  constructor () {}
  
  templatize(item:IItem): Promise<IItemTemplate> {
    return WebMapModule.templatize(item);
  }
}