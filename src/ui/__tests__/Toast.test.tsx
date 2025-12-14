import { describe, it, expect } from "vitest";
import { useToast } from "../../store/toastStore";

describe("toastStore", () => {
  it("shows toast", () => {
    useToast.getState().notify("Hello");
    expect(useToast.getState().show).toBe(true);
    expect(useToast.getState().message).toBe("Hello");
  });

  it("hides toast", () => {
    useToast.getState().hide();
    expect(useToast.getState().show).toBe(false);
  });
});
