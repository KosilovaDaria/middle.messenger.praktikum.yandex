import tpl from './tpl.hbs';
import * as style from'./style.module.css';

export default (label, path, extraClass) => {
  return tpl({mainClass: style.link_block,label, path, extraClass});
};