import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Index } from "@/routes/index";

describe("Arambha 2K26 invitation flow", () => {
  it("shows the event details and advances into the invitation", () => {
    render(<Index />);

    expect(screen.getByText(/14 OCTOBER 2024/)).toBeInTheDocument();
    expect(screen.getByText(/9:00 AM ONWARDS/)).toBeInTheDocument();
    expect(screen.getByText("ED HALL", { exact: false })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "TELL ME WHAT TO DO →" }));
    expect(screen.getByLabelText("Your name")).toBeInTheDocument();
  });

  it("takes a junior through the name, roll number, food choice, and poster", () => {
    render(<Index />);

    fireEvent.click(screen.getByRole("button", { name: "TELL ME WHAT TO DO →" }));
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Aarav" } });
    fireEvent.click(screen.getByRole("button", { name: "CONTINUE →" }));

    fireEvent.change(screen.getByLabelText("Your roll number"), { target: { value: "101" } });
    fireEvent.click(screen.getByRole("button", { name: "I AM A JUNIOR →" }));
    fireEvent.click(screen.getByRole("button", { name: "VEG 🥗" }));

    expect(screen.getByText(/Welcome to ARAMBHA 2K26/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "SHOW ME THE POSTER 🔥" }));
    expect(screen.getByRole("img", { name: "Arambha 2K26 Freshers Party invitation poster" })).toBeInTheDocument();
    expect(screen.getByText("14th OCT • 9 AM • ED HALL")).toBeInTheDocument();
  });
});