import tpl from './tpl.hbs';
import './style.css';

export default (text, time, className) => {
  return tpl({text, time, className});
};