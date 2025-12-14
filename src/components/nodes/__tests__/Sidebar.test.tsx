import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Sidebar from "../../sidebar/Sidebar";

describe("Sidebar", () => {
  it("renders sidebar items", () => {
    render(<Sidebar />);
    expect(screen.getByText(/condition/i)).toBeInTheDocument();
    expect(screen.getByText(/send message/i)).toBeInTheDocument();
    expect(screen.getByText(/wait/i)).toBeInTheDocument();
  });
});
