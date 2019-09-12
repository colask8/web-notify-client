module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'WebNotifyClient',
      externals: {
        react: 'React'
      }
    }
  }
}
