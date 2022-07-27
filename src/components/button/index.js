import tpl from './tpl.hbs';
import * as style from'./style.module.css';

export default (id, label, type, extraClass) => {
	return tpl({mainClass: style.button, id, label, type, extraClass});
};