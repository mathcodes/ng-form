module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.html',
    './src/**/*.ts',
  ],
  theme: {},
  variants: {},
  corePlugins: {
    // ...
    container: false,
  },

  components: {
    '@layer': {
      '.from-secondary-color': {
        color: 'var(--color-secondary)',
      },
    },
  },

};


