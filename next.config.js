const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')


const withStyles = require('@webdeb/next-styles')

module.exports = (phase) => {
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'

  return withStyles({
    sass: true, // use .scss files
    modules: true, // style.(m|module).css & style.(m|module).scss for module files
    env: {
      customKey: 'my-value',
      BASE_URL_API : isProd ? 'https://hello-nextjs-theta.vercel.app/' :  'http://localhost:3000/',
      BASE_URL_DB : ''
    }
  })
};