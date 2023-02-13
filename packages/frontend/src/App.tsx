import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import './App.css'
import { MenuAppBar, RoutesManager } from './components'
import { AuthGuard } from './guards'
import { PrivateRoutes, PublicRoutes } from './models'
import './styles/styles.module.css'
import { RoutesWithNotFound } from './utilities'

const Login = lazy(() => import('./pages/Login/Login'))
const Signin = lazy(() => import('./pages/Signin/Signin'))
const MyEmails = lazy(() => import('./pages/MyEmails/MyEmails'))
const ViewEmail = lazy(() => import('./pages/ViewEmail/ViewEmail'))

function App() {
  return (
    <div className='App'>
      <RoutesManager>
        <MenuAppBar />
        <RoutesWithNotFound>
          <Route path='/' element={<Navigate to={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.MYEMAILS}`} />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route path={PublicRoutes.SIGNIN} element={<Signin />} />
          <Route element={<AuthGuard privateValidation={true} />}>
            <Route path={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.MYEMAILS}`} element={<MyEmails />} />
            <Route path={`${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEWEMAIL}`} element={<ViewEmail />} />
          </Route>
        </RoutesWithNotFound>
      </RoutesManager>
    </div>
  )
}

export default App
