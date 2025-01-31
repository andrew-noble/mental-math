/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: ["bg-red-300", "bg-green-300"], //necessary to allow dynamic classnames (Tailwind purges unused classes at build time, need whitelist dynamic classes)
  theme: {
    extend: {
      keyframes: {
        floatUp: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-30px)" },
        },
      },
      animation: {
        floatUp: "floatUp 1s ease-out",
      },
    },
  },
  plugins: [],
};
