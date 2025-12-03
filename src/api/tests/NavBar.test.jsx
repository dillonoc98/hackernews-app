import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../src/components/Navbar";

describe("Navbar Component", () => {
  test("renders navbar and buttons", () => {
    const mockSetType = vi.fn();
    const mockSetCurrentPage = vi.fn();
    const mockSignOut = vi.fn();

    render(
      <Navbar
        type="topstories"
        setType={mockSetType}
        setCurrentPage={mockSetCurrentPage}
        onSignOut={mockSignOut}
      />
    );

    // Brand title
    expect(screen.getByText(/HackerNews React/i)).toBeInTheDocument();

    // Top Posts button
    const topButton = screen.getByText(/Top Posts/i);
    fireEvent.click(topButton);
    expect(mockSetType).toHaveBeenCalledWith("topstories");

    // New Posts button
    const newButton = screen.getByText(/New Posts/i);
    fireEvent.click(newButton);
    expect(mockSetType).toHaveBeenCalledWith("newstories");

    // Sign Out button
    const signOutButton = screen.getByText(/Sign Out/i);
    fireEvent.click(signOutButton);
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});