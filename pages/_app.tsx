import { wrapper } from '../redux/store'
import '../styles/index.css'
import  { AppProps /*, AppContext */ } from 'next/app'
// import '../styles/home.scss'
// import '../styles/main.scss'

const WrappedApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)
