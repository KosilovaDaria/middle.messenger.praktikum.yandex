import tpl from './tpl.hbs';
import * as style from'./style.module.css';

export default (id, label, type, path, extraClass) => {
	return tpl({mainClass: style.button, id, label, type, path, extraClass});
};