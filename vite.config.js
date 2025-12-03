import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/api/tests"], // <-- point to your actual test folder
    exclude: ["**/node_modules/**", "**/.git/**"],
  },
});