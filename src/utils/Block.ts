import EventBus from "./EventBus";
import { v4 as makeUUID } from 'uuid';
export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };
  protected _element: HTMLElement | null = null;
  // private _element: HTMLElement;
  private _meta: {tagName: string, props: any};
  protected props: any;
  _id: string | null = null;
  eventBus: () => EventBus;
  children: Record<string, Block>;

  constructor(tagName = "div", propsAndChildren: any = {}) {

    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;

    const eventBus = new EventBus();
    // console.log(eventBus)

    this._meta = {
      tagName,
      props
    };
    this._id = makeUUID();

    this.props = this._makePropsProxy({ ...props, _id: this._id });
    
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    // console.log('_registerEvents')
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));

  }
  _createResources() {
    // console.log('_createResources')
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
    // console.log(this._element)
    
  }

  protected init() {
    // console.log('init')
    this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    // this._componentDidMount();
    
  }

  _componentDidMount() {
    // console.log('_componentDidMount')
    this.componentDidMount();
   

  }
  componentDidMount() { }

  dispatchComponentDidMount() {
    // console.log('dispatchComponentDidMount')
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return
    }
    // this._render();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  compile(template, props) {
    const propsAndStubs = { ...props };
    
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub.replaceWith(child.getContent());
    });

    return fragment.content;

    // return template (propsAndStubs); 
  }

  addAttribute() {
    const { attr = {} } = this.props;
    Object.entries(attr as Record<string, string>).forEach(([key, value]) => {
      this._element?.setAttribute(key, value);
    });
  }

  _getChildren(propsAndChildren: any) {
    const children: Record<string, Block> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });
    
    return { children, props }
  }
  _makePropsProxy(props: any) {
    const self = this;

    const proxyProps = new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: any, prop, val) {
        // if (prop.startsWith('_')) {
        //   throw new Error("Нет прав");
        // } else {
          // const oldTarget = { ...target }
          target[prop] = val;
          // self.eventBus().emit(Block.EVENTS.FLOW_CDU, target[prop]);
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
          return true;
        // }
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    })

    return proxyProps;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    // console.log('_render')
    const block = this.render();
    this._removeEvents();
    this._element!.innerHTML = '';
    this._element!.appendChild(block);
    this._addEvents();
    this.addAttribute();
    
  }

  // render() { }
  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _addEvents(): void {
    const {events = {}} = this.props;

    Object.keys(events as Record<string, () => void>).forEach(eventName => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }
  _removeEvents(): void {
    const {events = {}} = this.props;

    Object.keys(events as Record<string, string>).forEach(eventName => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _createDocumentElement(tagName) {
    // console.log('_createDocumentElement')
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}
// import EventBus from "./EventBus";
// import { v4 as makeUUID } from 'uuid';

// export type TMeta = {
//   tagName: string;
//   props: any;
// };
// //для объектов с неограниченным кол-вом ключей две эквиваентные записи
// //либо интерфейс 
// // interface TPropsTemplate = {
// //   [key:string]: string
// // };
// //либо алиас типа
// type TPropsTemplate = Record<any, string>
// // type TPropsTemplate = {
// //   [key:string]: string
// // };


// export default class Block <TProps extends {}> {

//   static EVENTS = {
//     INIT: "init",
//     FLOW_CDM: "flow:component-did-mount",
//     FLOW_RENDER: "flow:render",
//     FLOW_CDU: "flow:component-did-update",
//   };
//   _element: HTMLElement;
//   _meta : TMeta;
//   _id : string | null;
//   _eventBus: EventBus;
//   props : TProps;
//   _children : TProps;
//   eventBus: any;


//   constructor(tagName = "div", propsAndChildren: TProps) {

//     const { children, props } = this._getChildren(propsAndChildren);
//     this._children = children;

//     this._eventBus = new EventBus();

//     this._meta = {
//       tagName,
//       props
//     };
//     this._id = makeUUID();

//     this.props = this._makePropsProxy({ ...props, _id: this._id });
    
//     this.eventBus = () => this._eventBus;

//     this._registerEvents();
//     this._eventBus.emit(Block.EVENTS.INIT);
//   }

//   _registerEvents() {
//     // console.log('_registerEvents');
//     this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
//     this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//     this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
//     this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));

//   }

//   compile(template: Function,  props : {}) {
//     const propsAndStubs = { ...props };
    
//     Object.entries(this._children).forEach(([key, child]: [string, { _id:string }]) => {
//       propsAndStubs[key] = `<div data-id="${child._id}"></div>`
//     });

//     const fragment = this._createDocumentElement('template');

//     fragment.innerHTML = template(propsAndStubs);

//     Object.values(this._children).forEach(child => {
//       const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

//       stub.replaceWith(child.getContent());
//     });

//     return fragment.content;

//     // return template (propsAndStubs); 
//   }
//   // addAttribute() {
//   //   const { attr = {} } = this._props;
//   //   Object.entries(attr as Record<string, string>).forEach(([key, value]) => {
//   //     this._element.setAttribute(key, value);
//   //   });
//   // }
//   addAttribute() {
//     const { attr = {} } = this.props;
//     Object.entries(attr).forEach(([key, value]) => {
//       this._element.setAttribute(key, value);
//     });
//   }

//   _getChildren(propsAndChildren) {
//     const children: TProps = {};
//     const props = {};

//     Object.entries(propsAndChildren).forEach(([key, value]) => {
//       if (value instanceof Block) {
//         children[key] = value;
//       } else {
//         props[key] = value;
//       }
//     });
    
//     return { children, props }
//   }
//   _makePropsProxy(props) {
//     const self = this;

//     const proxyProps = new Proxy(props, {
//       get(target, prop) {
//         const value = target[prop];
//         return typeof value === "function" ? value.bind(target) : value;
//       },
//       set(target, prop, val) {
//         if (prop.startsWith('_')) {
//           throw new Error("Нет прав");
//         } else {
//           target[prop] = val;
//           // self.eventBus().emit(Block.EVENTS.FLOW_CDU, target[prop]);
//           self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
//           return true;
//         }
//       },
//       deleteProperty() {
//         throw new Error('Отказано в доступе');
//       },
//     })

//     return proxyProps;
//   }

 
//   _createResources() {
//     // console.log('_createResources')
//     const { tagName } = this._meta;
//     this._element = this._createDocumentElement(tagName);
    
//   }

//   init() {
//     console.log('init')
//     this._createResources();
//     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//     // this._componentDidMount();
    
//   }

//   _componentDidMount() {
//     // console.log('_componentDidMount')
//     this.componentDidMount();
   

//   }
//   componentDidMount(oldProps) { }

//   dispatchComponentDidMount() {
//     // console.log('dispatchComponentDidMount')
//     this.eventBus.emit(Block.EVENTS.FLOW_CDM);
//   }

//   _componentDidUpdate(oldProps, newProps) {
//     const response = this.componentDidUpdate(oldProps, newProps);
//     if (!response) {
//       return
//     }
//     // this._render();
//     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//   }

//   componentDidUpdate(oldProps, newProps) {
//     return true;
//   }

//   setProps = nextProps => {
//     if (!nextProps) {
//       return;
//     }

//     Object.assign(this.props, nextProps);
//   };

//   get element() {
//     return this._element;
//   }

//   _render() {
//     // console.log('_render')
//     const block = this.render();
//     this._removeEvents();
//     this._element.innerHTML = '';
//     this._element.appendChild(block);
//     this._addEvents();
//     this.addAttribute();
    
//   }

//   render() { }

//   getContent() {
//     return this.element;
//   }

//   _addEvents() {
//     const {events = {}} = this.props;

//     Object.keys(events).forEach(eventName => {
//       this._element.addEventListener(eventName, events[eventName]);
//     });
//   }
//   _removeEvents() {
//     const {events = {}} = this.props;

//     Object.keys(events).forEach(eventName => {
//       this._element.addEventListener(eventName, events[eventName]);
//     });
//   }

//   _createDocumentElement(tagName) {
//     // console.log('_createDocumentElement')
//     const element = document.createElement(tagName);
//     element.setAttribute('data-id', this._id);
//     return element;
//   }

//   show() {
//     this.getContent().style.display = "block";
//   }

//   hide() {
//     this.getContent().style.display = "none";
//   }
// }


// import EventBus from "./EventBus";
// import { v4 as makeUUID } from 'uuid';
// export default class Block {
//   static EVENTS = {
//     INIT: "init",
//     FLOW_CDM: "flow:component-did-mount",
//     FLOW_RENDER: "flow:render",
//     FLOW_CDU: "flow:component-did-update",
//   };
//   _element = null;
//   _meta = null;
//   _id = null;
//   props = null;

//   constructor(tagName = "div", propsAndChildren = {}) {

//     const { children, props } = this._getChildren(propsAndChildren);
//     this.children = children;

//     const eventBus = new EventBus();
//     this._meta = {
//       tagName,
//       props
//     };
//     this._id = makeUUID();

//     this.props = this._makePropsProxy({ ...props, _id: this._id });
    
//     this.eventBus = () => eventBus;

//     this._registerEvents(eventBus);
//     eventBus.emit(Block.EVENTS.INIT);
//   }
//   compile(template, props) {
//     const propsAndStubs = { ...props };
    
//     Object.entries(this.children).forEach(([key, child]) => {
//       propsAndStubs[key] = `<div data-id="${child._id}"></div>`
//     });

//     const fragment = this._createDocumentElement('template');

//     fragment.innerHTML = template(propsAndStubs);

//     Object.values(this.children).forEach(child => {
//       const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

//       stub.replaceWith(child.getContent());
//     });

//     return fragment.content;

//     // return template (propsAndStubs); 
//   }
//   // addAttribute() {
//   //   const { attr = {} } = this._props;
//   //   Object.entries(attr as Record<string, string>).forEach(([key, value]) => {
//   //     this._element.setAttribute(key, value);
//   //   });
//   // }
//   addAttribute() {
//     const { attr = {} } = this.props;
//     Object.entries(attr).forEach(([key, value]) => {
//       this._element.setAttribute(key, value);
//     });
//   }

//   _getChildren(propsAndChildren) {
//     const children = {};
//     const props = {};

//     Object.entries(propsAndChildren).forEach(([key, value]) => {
//       if (value instanceof Block) {
//         children[key] = value;
//       } else {
//         props[key] = value;
//       }
//     });
    
//     return { children, props }
//   }
//   _makePropsProxy(props) {
//     const self = this;

//     const proxyProps = new Proxy(props, {
//       get(target, prop) {
//         const value = target[prop];
//         return typeof value === "function" ? value.bind(target) : value;
//       },
//       set(target, prop, val) {
//         if (prop.startsWith('_')) {
//           throw new Error("Нет прав");
//         } else {
//           target[prop] = val;
//           // self.eventBus().emit(Block.EVENTS.FLOW_CDU, target[prop]);
//           self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
//           return true;
//         }
//       },
//       deleteProperty() {
//         throw new Error('Отказано в доступе');
//       },
//     })

//     return proxyProps;
//   }

//   _registerEvents(eventBus) {
//     eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));

//   }

//   _createResources() {
//     console.log('_createResources')
//     const { tagName } = this._meta;
//     this._element = this._createDocumentElement(tagName);
    
//   }

//   init() {
//     console.log('init')
//     this._createResources();

//     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//     // this._componentDidMount();
    
//   }

//   _componentDidMount() {
//     console.log('_componentDidMount')
//     this.componentDidMount();
   

//   }
//   componentDidMount(oldProps) { }

//   dispatchComponentDidMount() {
//     console.log('dispatchComponentDidMount')
//     this.eventBus().emit(Block.EVENTS.FLOW_CDM);
//   }

//   _componentDidUpdate(oldProps, newProps) {
//     const response = this.componentDidUpdate(oldProps, newProps);
//     if (!response) {
//       return
//     }
//     // this._render();
//     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//   }

//   componentDidUpdate(oldProps, newProps) {
//     return true;
//   }

//   setProps = nextProps => {
//     if (!nextProps) {
//       return;
//     }

//     Object.assign(this.props, nextProps);
//   };

//   get element() {
//     return this._element;
//   }

//   _render() {
//     console.log('_render')
//     const block = this.render();
//     this._removeEvents();
//     this._element.innerHTML = '';
//     this._element.appendChild(block);
//     this._addEvents();
//     this.addAttribute();
    
//   }

//   render() { }

//   getContent() {
//     return this.element;
//   }

//   _addEvents() {
//     const {events = {}} = this.props;

//     Object.keys(events).forEach(eventName => {
//       this._element.addEventListener(eventName, events[eventName]);
//     });
//   }
//   _removeEvents() {
//     const {events = {}} = this.props;

//     Object.keys(events).forEach(eventName => {
//       this._element.addEventListener(eventName, events[eventName]);
//     });
//   }

//   _createDocumentElement(tagName) {
//     console.log('_createDocumentElement')
//     const element = document.createElement(tagName);
//     element.setAttribute('data-id', this._id);
//     return element;
//   }

//   show() {
//     this.getContent().style.display = "block";
//   }

//   hide() {
//     this.getContent().style.display = "none";
//   }
// }


