type EventHandler = (...args: any[]) => void;

export class EventBus {
  private events: { [key: string]: EventHandler[] } = {};

  on(event: string, handler: EventHandler): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  off(event: string, handler?: EventHandler): void {
    if (this.events[event]) {
      this.events[event] = handler
        ? this.events[event].filter((h) => h !== handler)
        : [];
    }
  }

  emit(event: string, ...args: any[]): void {
    const handlers = this.events[event];
    if (handlers) {
      handlers.forEach((handler) => handler(...args));
    }
  }
}
