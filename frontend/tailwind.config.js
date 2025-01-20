/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        floatUp: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-50px)" },
        },
      },
      animation: {
        floatUp: "floatUp 1.5s ease-out",
      },
    },
  },
  plugins: [],
};
