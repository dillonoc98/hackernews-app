import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../src/components/Login";

describe("Login Component", () => {
  test("renders login button and title", () => {
    const mockOnLogin = vi.fn();
    render(<Login onLogin={mockOnLogin} />);

    // Title
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();

    // Button
    const button = screen.getByRole("button", { name: /sign in/i });
    expect(button).toBeInTheDocument();

    // Click button triggers onLogin
    fireEvent.click(button);
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });
});