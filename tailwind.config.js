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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
