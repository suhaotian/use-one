type EventHandler = (...args: any[]) => void;

export class EventBus {
  private E = new Map<string, EventHandler[]>();

  on(event: string, handler: EventHandler): void {
    this.E.set(event, [...(this.E.get(event) || []), handler]);
  }

  off(event: string, handler?: EventHandler): void {
    this.E.set(
      event,
      handler ? this.E.get(event)?.filter((h) => h !== handler) || [] : []
    );
  }

  emit(event: string, ...args: any[]): void {
    this.E.get(event)?.forEach((cb) => cb(...args));
  }
}
