/* eslint-disable max-classes-per-file */
import Block from './Block'; // use(pathname: string, block: new() => Block) { //если передавать в индексе конструктор, а не объект

function isEqual(lhs: any, rhs: any) {
  return lhs === rhs;
}
function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }
  root.innerHTML = '';
  root.append(block.getContent()!);
  return root;
}

class Route {
  _pathname: string;
  _blockClass: new () => Block;
  // если передавать в индексе конструктор, а не объект
  // _blockClass: any;

  _block: Block | null;
  // _props: { rootQuery: string; };
  _props: any;
  // constructor(pathname: string, view: any, props: { rootQuery: string; }) {
  constructor(pathname: string, view: new () => any, props: { rootQuery: string; }) {
    // если передавать в индексе конструктор, а не объект
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    this._block = null
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      // this._block = this._blockClass;
      this._block = new this._blockClass();
      // use(pathname: string, block: new() => Block) { //если передавать в индексе конструктор, а не объект
      render(this._props.rootQuery, this._block!)
    }
  }
}

export default class Router {
  static __instance: Router;
  routes!: Route[];
  history!: History;
  _currentRoute: Route | null = null;
  _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  // public use(pathname: string, block: any) {
  use(pathname: string, block: new () => Block) {
    //  если передавать в индексе конструктор, а не объект
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = (event: any) => {
      this._onRoute(event?.currentTarget?.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route: any) => route.match(pathname));
  }
}
// const router = new Router('.app')
// export default router;
