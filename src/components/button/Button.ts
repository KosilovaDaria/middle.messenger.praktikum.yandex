import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import * as styles from './style.module.css';

type ButtonProps = {
  label: string;
  type? : string;
  events?: {
    click: () => void;
  };
}

export default class Button extends Block<ButtonProps> {
  constructor(props:ButtonProps) {
    // super('button', props);
    super({ ...props });
    // this.element!.classList.add(styles.button)
  }

  render() {
    return this.compile(tpl, { ...this.props, styles });
  }

  // addEvents() {
  //   this._element!.querySelectorAll('button').forEach((btn: any) => {
  //     btn.addEventListener('click', this.props.events.click);
  //   });
  // }
}
