/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */
import EventBus from './EventBus';
import { set, isEqual } from './helpers';
import Block from './Block';
import { User } from '../api/AuthApi';
import { ChatInfo } from '../api/ChatApi';
import { Message as MessageInfo } from '../controllers/MessageController';

export enum StoreEvents {
  Updated = 'updated',
}
type State = {
  user: User;
  chats: ChatInfo[];
  messages: Record<number, MessageInfo[]>;
  selectedChat?: number;
  createdChat?: number;

}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}
const store = new Store();

export function withStore<SP extends Partial<any>>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<SP & P>) {
    let previousState: any;

    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        previousState = mapStateToProps(store.getState());
        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          if (isEqual(previousState, stateProps)) {
            return;
          }
          previousState = stateProps;
          this.setProps({ ...stateProps });
        });
      }
    }
  }
}

export default store;
