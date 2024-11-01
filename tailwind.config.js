module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xsm: ["0.5rem", { lineHeight: "1" }],
        "30xl": ["28rem", { lineHeight: "1" }],
        "25xl": ["24rem", { lineHeight: "1" }],
        "14xl": ["15rem", { lineHeight: "1" }],
      },
      animation: {
        "slide-in": "slideIn 0.2s ease-out forwards",
        "slide-out": "slideOut 0.2s ease-in forwards",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
