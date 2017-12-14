module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'OnClickToggleDisplay',
      externals: {
        react: 'React'
      }
    }
  }
}
