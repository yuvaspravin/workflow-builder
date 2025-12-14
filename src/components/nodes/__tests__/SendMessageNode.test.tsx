import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SendMessageNode from "../SendMessageNode";
import { createMockNodeProps } from "../../../test-utils/mockNodeProps";

/* 🔥 MOCK reactflow completely (TYPE SAFE) */
vi.mock("reactflow", async () => {
  const actual = await vi.importActual<typeof import("reactflow")>("reactflow");

  return {
    ...actual,

    // mock Handle to avoid zustand / provider errors
    Handle: () => <div data-testid="handle" />,

    // minimal Position enum
    Position: {
      Left: "left",
      Right: "right",
      Top: "top",
      Bottom: "bottom",
    },
  };
});

describe("SendMessageNode", () => {
  it("renders Send Message node", () => {
    const props = createMockNodeProps(
      { username: "Yuvas", message: "Hello" },
      "sendMessage"
    );

    render(<SendMessageNode {...props} />);

    expect(screen.getByText(/send message/i)).toBeInTheDocument();
    expect(screen.getByText(/yuvas/i)).toBeInTheDocument();
  });

  it("shows fallback when username is missing", () => {
    const props = createMockNodeProps({ message: "Hello" }, "sendMessage");

    render(<SendMessageNode {...props} />);

    expect(screen.getByText(/no username/i)).toBeInTheDocument();
  });
});
