import { vi } from "vitest";

/* ---------------- ResizeObserver ---------------- */
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(
  globalThis as unknown as { ResizeObserver: typeof ResizeObserverMock }
).ResizeObserver = ResizeObserverMock;

/* ---------------- matchMedia ---------------- */
Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

/* ---------------- requestAnimationFrame ---------------- */
(
  globalThis as unknown as {
    requestAnimationFrame: (cb: () => void) => number;
  }
).requestAnimationFrame = (cb) => {
  return Number(setTimeout(cb, 0));
};

(
  globalThis as unknown as {
    cancelAnimationFrame: (id: number) => void;
  }
).cancelAnimationFrame = (id) => {
  clearTimeout(id);
};
