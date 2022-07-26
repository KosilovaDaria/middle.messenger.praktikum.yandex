import tpl from './tpl.hbs';
import * as style from './style.module.css';

export default (id, label, type, name, placeholder) => {
  return tpl({blockClass:style.block, inputClass:style.input, id, label, type, name, placeholder});
};