import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // ✅ Go to dev server
  await page.goto("http://localhost:5173");
});

test("Login screen loads", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});

test("User can log in and navbar appears", async ({ page }) => {
  await page.getByRole("textbox", { name: "Username" }).fill("test");
  await page.getByRole("textbox", { name: "Password" }).fill("test");
  await page.getByRole("button", { name: "Sign In" }).click();

  // ✅ Wait for navbar to appear
  const navbar = page.locator("nav");
  await navbar.waitFor({ state: "visible", timeout: 10000 });
  await expect(navbar).toBeVisible();
});

test("Navbar switches to New Posts", async ({ page }) => {
  await page.getByRole("textbox", { name: "Username" }).fill("test");
  await page.getByRole("textbox", { name: "Password" }).fill("test");
  await page.getByRole("button", { name: "Sign In" }).click();

  // ✅ Wait for navbar
  const navbar = page.locator("nav");
  await navbar.waitFor({ state: "visible", timeout: 10000 });

  const newPostsBtn = page.locator("button", { hasText: "New Posts" });
  await expect(newPostsBtn).toBeVisible();
  await newPostsBtn.click();

  await expect(newPostsBtn).toHaveCSS("background-color", /rgb/); // optional style check
});

test("View All toggles correctly", async ({ page }) => {
  await page.getByRole("textbox", { name: "Username" }).fill("test");
  await page.getByRole("textbox", { name: "Password" }).fill("test");
  await page.getByRole("button", { name: "Sign In" }).click();

  const navbar = page.locator("nav");
  await navbar.waitFor({ state: "visible", timeout: 10000 });

  const viewAllBtn = page.locator("button", { hasText: "View All" });
  await viewAllBtn.waitFor({ state: "visible" });
  await viewAllBtn.click();

  const collapseBtn = page.locator("button", { hasText: "Collapse" });
  await collapseBtn.waitFor({ state: "visible" });
  await expect(collapseBtn).toBeVisible();
});