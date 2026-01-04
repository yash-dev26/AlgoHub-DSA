import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui, typography],
  daisyui: {
    themes: ["light", "dark"],
  },
};