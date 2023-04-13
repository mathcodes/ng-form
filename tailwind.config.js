module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,ts}'],
  theme: {},
  variants: {},
  plugins: [],
  components: {
    '@layer': {
      '.from-secondary-color': {
        color: 'var(--color-secondary)',
      },
    },
  },

};


