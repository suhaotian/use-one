type EventHandler = (...args: any[]) => void;

export class EventBus {
  private events = new Map<string, EventHandler[]>();

  on(event: string, handler: EventHandler): void {
    this.events.set(event, [...(this.events.get(event) || []), handler]);
  }

  off(event: string, handler?: EventHandler): void {
    this.events.set(
      event,
      handler ? this.events.get(event)?.filter((h) => h !== handler) || [] : []
    );
  }

  emit(event: string, ...args: any[]): void {
    this.events.get(event)?.forEach((cb) => cb(...args));
  }
}
