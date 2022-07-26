import tpl from './tpl.hbs';
import * as style from './style.module.css';

export default (id, type, name ) => {
  return tpl({blockClass:style.block, inputClass: style.input, labelClass: style.label, id, type, name});
};