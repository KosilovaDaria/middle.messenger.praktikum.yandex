import tpl from './tpl.hbs';
import './style.css';

export default ( className) => {
  return tpl({className});
};