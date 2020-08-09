const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')

module.exports = (phase) => {
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    const env = {
      customKey: 'my-value',
      BASE_URL_API : isProd ? 'https://hello-nextjs-theta.vercel.app/' :  'http://localhost:3000/',
      BASE_URL_DB : ''
    }
    // next.config.js object
    return {
        env,
    }
}