import tpl from './tpl.hbs';
import * as style from'./style.module.css';

export default (type, name, placeholder, extraClass) => {
  return tpl({mainClass: style.input, type, name,placeholder, extraClass});
};