import Block from './Block'; // use(pathname: string, block: new() => Block) { //если передавать в индексе конструктор, а не объект
import Route from './Route';

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
  use(pathname: string, block: new() => Block) {
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
