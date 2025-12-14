import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

/* ===========================
   React Flow / ResizeObserver
=========================== */
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

/* ===========================
   DOM Layout mocks
=========================== */
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  width: 100,
  height: 100,
  top: 0,
  left: 0,
  bottom: 100,
  right: 100,
  x: 0,
  y: 0,
  toJSON: () => {},
}));

Element.prototype.scrollIntoView = vi.fn();

/* ===========================
   URL mock (exportJSON)
=========================== */
vi.stubGlobal("URL", {
  createObjectURL: vi.fn(),
});

/* ===========================
   localStorage mock (FULL)
=========================== */
const localStorageMock: Storage = {
  getItem: vi.fn((key: string) => {
    return key in store ? store[key] : null;
  }),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    store = {};
  }),
  key: vi.fn((index: number) => {
    return Object.keys(store)[index] ?? null;
  }),
  get length() {
    return Object.keys(store).length;
  },
};

let store: Record<string, string> = {};

vi.stubGlobal("localStorage", localStorageMock);
