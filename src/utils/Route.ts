import Block from './Block';
// import render from './render';

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

export default class Route {
  _pathname: string;
  _blockClass: new() => Block;
  // если передавать в индексе конструктор, а не объект
  // _blockClass: any;

  _block: Block | null;
  // _props: { rootQuery: string; };
  _props: any;
  // constructor(pathname: string, view: any, props: { rootQuery: string; }) {
  constructor(pathname: string, view: new() => any, props: { rootQuery: string; }) {
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
