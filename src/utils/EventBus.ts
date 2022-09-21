type Handler<Args extends any[] = unknown[]> = (...args: Args) => void;
type MapInterface<P> = { [K in keyof P]: P[K] }[keyof P];

export default class EventBus<E extends Record<string, string> = Record<string, string>, Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>> {
  private readonly listeners: {
    [K in MapInterface<E>]?: Handler<Args[K]>[]
  } = {};

  constructor() {
    this.listeners = {};
  }

  on<Event extends MapInterface<E>>(event:Event, callback: Handler<Args[Event]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback);
  }

  off<Event extends MapInterface<E>>(event:Event, callback: Handler<Args[Event]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback,
    );
  }

  emit<Event extends MapInterface<E>>(event:Event, ...args: Args[Event]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event]!.forEach((listener) => {
      listener(...args);
    });
  }
}
