import store from '@/redux/store'
import { SnackbarUtilitiesConfigurator } from '@/utilities'
import { SnackbarProvider } from 'notistack'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Loader } from '../Loader'

function RoutesManager({ children }: { children: React.ReactNode }) {
  return (
    <div className='App'>
      <SnackbarProvider>
        <SnackbarUtilitiesConfigurator />
        <Suspense fallback={<Loader />}>
          <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
          </Provider>
        </Suspense>
      </SnackbarProvider>
    </div>
  )
}

export default RoutesManager
