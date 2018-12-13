import {IItem, ISavedItemTemplate} from './interfaces';
import {locator} from './locator';

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
  return new Promise<ISavedItemTemplate[]>(
    resolve => {
      const tmplPromises = models.map((model) => {
        const module = locator(model.item.type);
        return module.templatize(model);
      });
      Promise.all(tmplPromises)
      .then(
        templates => {
          const savePromises = templates.map(
            (template, index) => {
              const module = locator(template.item.type);
              return module.save(template, "title" + index);
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
      ` and has ${e.template.resources.length} resources, first is ${e.template.resources[0]}`);
    })
  })
