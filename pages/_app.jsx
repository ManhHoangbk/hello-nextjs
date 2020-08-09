import { wrapper } from '../redux/store'
import '../styles/index.css'
import '../styles/home.scss'
import '../styles/main.scss'

const WrappedApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)
