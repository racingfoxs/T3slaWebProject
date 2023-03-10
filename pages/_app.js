import '@/styles/globals.css'
import  { store } from '../store/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
    )
}

// https://docs.spacexdata.com/#d65a7f85-e0c7-41ce-b41d-9ad20a238d90
// https://api.spacexdata.com/v3
// https://api.spacexdata.com/v3/capsules
// https://api.spacexdata.com/v3/capsules/{{capsule_serial}}
// https://api.spacexdata.com/v3/capsules/upcoming
// https://api.spacexdata.com/v3/capsules/past


