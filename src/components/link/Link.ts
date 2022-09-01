// import tpl from './tpl.hbs';
// import * as style from'./style.module.css';

// export default (label, path, extraClass) => {
//   return tpl({mainClass: style.link_block,label, path, extraClass});
// };

import Block from "../../utils/Block";
import tpl from './tpl.hbs';

export default class Link extends Block {

  render() {
    return this.compile(tpl, {...this.props});
  }
  addEvents() {
    this._element!.querrySelectorAll('a').forEach(a => {
      a.addEventListener('click', this.props.events.click);
    });
  }
}