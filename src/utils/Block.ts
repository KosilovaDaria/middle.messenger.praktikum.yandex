import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus';
import '../style.css';

export default class Block<P extends Record<string, any> = any > {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  } as const;

  public _id = makeUUID();
  public props: P;
  public children: Record<string, any | any[]>;
  private eventBus: () => EventBus;
  protected _element: HTMLElement | null = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(propsAndChildren: P) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildren(propsAndChildren);
    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }
  _getChildren(propsAndChildren: P): { props: P, children: Record<string, Block | Block[]> } {
    const children: Record<string, Block | Block[]> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children }
  }
  _addEvents() {
    const { events = {} } = this.props as P & { events: Record<string, ()=> void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props as P & { events: Record<string, ()=> void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }
  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() { }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(ch => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  public componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  compile(template: (props: any) => string, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(item => `<div data-id="${item._id}"></div>`)
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`
      }
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = template(propsAndStubs);

    const replaceStub = (component: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);

      if (!stub) {
        return;
      }

      // component.getContent()?.append(...Array.from(stub!.childNodes));

      stub.replaceWith(component.getContent()!);
    }

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });
    return fragment.content;
  }

  addAttribute() {
    const { attr = {} } = this.props;
    Object.entries(attr as Record<string, string>).forEach(([key, value]: [any, any]) => {
      this._element?.setAttribute(key, value);
    });
  }
  _makePropsProxy(props: P) {
    const self = this;

    const proxyProps = new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, val) {
        const oldTarget = { ...target }
        target[prop as keyof P] = val;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    })

    return proxyProps;
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    this._removeEvents();
    const newElement = block.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttribute();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _createDocumentElement(tagName:any) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }
}
