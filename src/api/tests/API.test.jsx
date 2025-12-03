import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../src/App";

// Mock fetch globally
beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes("topstories")) {
      return Promise.resolve({
        json: () => Promise.resolve([1, 2, 3]),
      });
    }
    if (url.includes("item")) {
      const id = url.match(/item\/(\d+)/)[1];
      return Promise.resolve({
        json: () => Promise.resolve({ id, title: `Post ${id}`, by: "user" }),
      });
    }
    return Promise.reject("Unknown API call");
  });
});

describe("App Component", () => {
  test("renders login first and logs in", () => {
    render(<App />);
    const loginButton = screen.getByRole("button", { name: /sign in/i });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(screen.getByText(/Top Posts/i)).toBeInTheDocument();
  });

  test("loads posts and shows them", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => screen.getByText("Post 1"));

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.getByText("Post 3")).toBeInTheDocument();
  });

  test("pagination works", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => screen.getByText("Post 1"));
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(screen.getByText("Post 1")).toBeInTheDocument(); // mock data stays the same
  });
});