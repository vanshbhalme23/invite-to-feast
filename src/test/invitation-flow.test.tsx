import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Route } from "@/routes/index";

const InvitationPage = Route.options.component;

if (InvitationPage === undefined) {
  throw new Error("The invitation page component is missing.");
}

describe("Arambha 2K26 invitation flow", () => {
  it("shows the event details and advances into the invitation", () => {
    render(<InvitationPage />);

    expect(screen.getByText(/23 OCTOBER 2026/)).toBeInTheDocument();
    expect(screen.getByText(/10:30 AM ONWARDS/)).toBeInTheDocument();
    expect(screen.getByText(/SHIVSHANKAR SABHAGRUA/, { exact: false })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "TELL ME WHAT TO DO →" }));
    expect(screen.getByLabelText("Your name")).toBeInTheDocument();
  });

  it("takes a junior through the name, roll number, food choice, and poster", () => {
    render(<InvitationPage />);

    fireEvent.click(screen.getByRole("button", { name: "TELL ME WHAT TO DO →" }));
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Aarav" } });
    fireEvent.click(screen.getByRole("button", { name: "CONTINUE →" }));

    fireEvent.change(screen.getByLabelText("Your roll number"), { target: { value: "101" } });
    fireEvent.click(screen.getByRole("button", { name: "I AM A JUNIOR →" }));
    fireEvent.click(screen.getByRole("button", { name: "VEG" }));

    expect(screen.getByText(/Welcome to FRESH AURA 2K26/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "SHOW ME THE POSTER" }));
    expect(screen.getByRole("img", { name: "FRESH AURA 2K26 Fresher's Party invitation poster" })).toBeInTheDocument();
    expect(screen.getByText("23rd OCT • 10:30 AM • SHIVSHANKAR SABHAGRUA")).toBeInTheDocument();
  });
});