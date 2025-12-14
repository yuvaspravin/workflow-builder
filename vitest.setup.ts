import "@testing-library/jest-dom";

/* ============================================================
   ResizeObserver (required by React Flow)
   ============================================================ */
class ResizeObserverMock implements ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

globalThis.ResizeObserver = ResizeObserverMock;

/* ============================================================
   URL + Object URL
   ============================================================ */
globalThis.URL.createObjectURL = (): string => "mock-object-url";
globalThis.URL.revokeObjectURL = (): void => {};

/* ============================================================
   matchMedia (full MediaQueryList compatibility)
   ============================================================ */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,

    // modern API
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,

    // legacy API
    addListener: () => {},
    removeListener: () => {},
  }),
});

/* ============================================================
   requestAnimationFrame (React Flow dependency)
   ============================================================ */
globalThis.requestAnimationFrame = (cb: FrameRequestCallback): number =>
  window.setTimeout(cb, 0);

globalThis.cancelAnimationFrame = (id: number): void => window.clearTimeout(id);
