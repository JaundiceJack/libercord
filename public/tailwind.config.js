module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '104': '26rem',
        '120': '30rem',
        '136': '34rem',
        '152': '38rem',
        '168': '42rem'
      }
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"],
    extend: {
      transform: ['hover', 'group-hover', 'focus'],
      borderWidth: ['hover', 'group-hover', 'focus'],
      borderRadius: ['group-hover'],
      width: ['group-hover'],
      height: ['hover'],
      display: ['hover', 'group-hover', 'focus'],
      backgroundImage: ['hover', 'group-hover', 'focus'],
    },
  },
  plugins: [],
}
