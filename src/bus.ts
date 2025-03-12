type EventHandler = (...args: any[]) => void;

export class EventBus {
  private E = new Map<string, EventHandler[]>();

  on(event: string, handler: EventHandler): void {
    const handlers = this.E.get(event) || [];
    this.E.set(event, [...handlers, handler]);
  }

  off(event: string, handler?: EventHandler): void {
    if (!this.E.has(event)) return;

    this.E.set(
      event,
      handler ? this.E.get(event)!.filter((h) => h !== handler) : []
    );
  }

  emit(event: string, ...args: any[]): void {
    this.E.get(event)
      ?.slice()
      .forEach((h) => h(...args));
  }
}
