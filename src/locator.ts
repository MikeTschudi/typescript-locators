import * as WebMapModule from './modules/webmap';
import * as DashboardModule from './modules/dashboard';
import DashboardProcessor from './facades/dashboard';
import WebmapProcessor from './facades/webmap';
import {IItem} from './interfaces';

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

export function ProcessorFactory(type:string) {
  switch(type.toLowerCase()) {
    case 'web map':
      return new WebmapProcessor();
    case 'dashboard':
      return new DashboardProcessor();
    default:
      return 
  }
}


const models = [
  {
    item: {
      type: 'Dashboard'
    },
    data: {}
  },
  {
    item: {
      type: 'Web Map'
    },
    data: {}
  }
];

function moduleLocator(models:IItem[]) {
  
  const tmplPromises = models.map((model) => {
    const module = locator(model.item.type);
    return module.templatize(model);
  });
  
  return Promise.all(tmplPromises);
    
}

function factory(models:IItem[]) {
  const tmplPromises = models.map((model) => {
    const processor = ProcessorFactory(model.item.type);
    return processor.templatize(model);
  });
  
  return Promise.all(tmplPromises);
}

moduleLocator(models)
  .then((results) => {
    console.info(`Module Locator Output:`)
    results.forEach((e) => {
      console.info(`Type ${e.item.type} has ${e.resources.length} resources, first is ${e.resources[0]}`);
    })
  })

factory(models)
  .then((results) => {
    console.info(`ProcessorFactory Output:`)
    results.forEach((e) => {
      console.info(`Type ${e.item.type} has ${e.resources.length} resources, first is ${e.resources[0]}`);
    })
  })
