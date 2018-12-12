# Typescript Locator and Factory Pattern Experiments

This is some experimentation around how to accomplish a few objectives

- be able to write code in a generic manner, but which uses type-specific implementation for data transformations
- be able to export the actual data transformation functions separately, allowing other client apps to simply `import {theFnINeed} from "theModule"` instead of having to use a big fat class with 50 methods.
- be able to still leverage interfaces to ensure build time checking

## A Tale Of Items
We are dealing with ArcGIS Online Items. Items have two main structures - the Item metadata, and the "data". Depending on the item type, the "data" may or may not be json, and the structure of the json varies widely.

Our goal is to be able to have generic logic - such as the transformation of a existing item into a template that can be used to create clones of the original. 

So we'd what to do something like...

```
const tmpl = templatize(sourceItem);
```

Where that templatize implemetation differs based on the `type` of the sourceItem

What's more, we will actually need to call 10 or so functions, usually as part of a promise chain, in order to orchestrate this process.

So we really want something more like...

```
const processor = ProcessorFactory(sourceItem.type);

processor.templatize(sourceItem)
  .then(processor.someOtherThing)
  .then(processor.save)

```

Meanwhile, we also want to "lean-functional", by which we mean we'd like to avoid `new`-ing up classes for each type and having the class operate on it's internal data. Instead we want to use "pure" functions. Since more of these operations are async, we'll call these "pure-ish" fuctions.
And, as noted at the start, we want these functions accessible as direct imports.

## Locator using Modules

In this pattern, we have a module that exports multiple functions...

```
// modules/dashboard.ts
import {IItem, IItemTemplate} from '../interfaces';

export function templatize(item:IItem) {
  const tmpl = {...item} as IItemTemplate;
  tmpl.resources = ['dashboard.png']
  return Promise.resolve(tmpl);
}

export function save(item:IItem) {
  return Promise.resolve({success:true});
}
```

In our locator module, we import the whole module and then use the type to return the module...

```
import * as WebMapModule from './modules/webmap';
import * as DashboardModule from './modules/dashboard';

export function locator(type:string) {
  switch(type.toLowerCase()) {
    case 'web map':
      return WebMapModule;
    case 'dashboard':
      return DashboardModule;
    default:
      // we need some default processor module here
      return 
  }
}
```

The `import * as <name>` allows us to treat the entire module as a single unit and pass it out of the locator to the consumer. This is simple and seems to meet out basic needs.

## Adding Interfaces

Since we are using typescript, it seemed like it would be a good idea to enforce the shape of the Processor using an interface. 

```
// Item Processor Interface
export interface IItemProcessor {
  templatize(item:IItem): Promise<IItemTemplate>;
  save(item:IItem): Promise<any>; //any just to keep this simple
}
```

Now, we need classes because a module with multiple exports can't implement an interface. But, as I said we don't really want to be `new`-ing up a bunch of stateful objects, nor do we want to bury the functions in a class. So we create a class that implements the interface, and delegates to the functions in the module.

```
import {IItemProcessor, IItem, IItemTemplate} from '../interfaces';
import * as DashboardModule from '../modules/dashboard';

export default class DashboardProcessor implements IItemProcessor {
  constructor () {}

  templatize(item:IItem): Promise<IItemTemplate> {
    return DashboardModule.templatize(item);
  }

  save(item:IItem): Promise<any> {
    return DashboardModule.save(item);
  }
}
```

With this, we can now create a `ProcessorFactor` function...

```
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
```

And now we can write code like we wanted at the start.

```
const processor = ProcessorFactory(item.type);

processor.templatize(item)
.then(processor.save)
```

## How to Run the example

- `npm i` to install the dependencies
- `tsc` in the root folder. This will build the commonjs in `./dist`
- `node ./dist/locator.js` will run the example which executes both the module locator and the factor patterns.

