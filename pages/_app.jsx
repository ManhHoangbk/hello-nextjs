import { wrapper } from '../redux/store'
import '../styles/index.css'
import Providers from '../components/Providers';
// import '../styles/home.scss'
// import '../styles/main.scss'

const WrappedApp = ({ Component, pageProps }) => {
  // return <Providers>
  //   <Component {...pageProps} />
  // </Providers>

  return   <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)
