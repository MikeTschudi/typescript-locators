import {IItem, IItemTemplate, ISavedItemTemplate} from './interfaces';
import {locator} from './locator';

const models:IItem[] = [
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
  },
  {
    item: {
      type: 'Web Mapping Application'
    },
    data: {}
  }
];

function moduleLocator(models:IItem[]) {
  return new Promise<ISavedItemTemplate[]>(
    resolve => {
      const tmplPromises = models.map((model) => {
        const itemTemplate:IItemTemplate = locator(model);
        return itemTemplate.fcns.templatize(itemTemplate);
      });
      Promise.all(tmplPromises)
      .then(
        templates => {
          const savePromises = templates.map(
            (template, index) => {
              return template.fcns.save(template, "title" + index);
            }
          );
          Promise.all(savePromises)
          .then(
            savedTemplates => resolve(savedTemplates)
          );
        }
      );    
    }
  );
}

moduleLocator(models)
  .then((results) => {
    console.info(`Module Locator Output:`)
    results.forEach((e) => {
      console.info(`Item ${e.label} of type ${e.template.item.type} was ` +
      (e.success ? 'saved' : 'not saved') +
      (!e.template.resources ? ' with no resources' :
      ` and has ${e.template.resources.length} resources, first is ${e.template.resources[0]}`));
    })
  })
