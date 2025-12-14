import { describe, it, expect } from "vitest";
import { createNodePayload } from "../nodeFactory";

describe("nodeFactory", () => {
  it("creates node payload correctly", () => {
    const payload = createNodePayload("SendMessage");
    expect(payload.type).toBe("SendMessage");
  });
});
