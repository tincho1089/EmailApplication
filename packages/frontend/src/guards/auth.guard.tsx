import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes } from '../models'
import { AppStore } from '../redux/store'

interface Props {
  privateValidation: boolean
}
// el Outlet en react-router-dom es un componente que renderiza el contenido de la ruta y sus hijos (si los tiene)
// el Navigate es un componente que redirige a otra ruta (si el replace es true, reemplaza la ruta actual en el historial)
// el Navigate se puede usar para redirigir a una ruta privada si el usuario no esta logueado
// o redirigir a una ruta publica si el usuario esta logueado
// o redirigir a una ruta privada si el usuario no tiene el rol necesario para acceder a la ruta
// o redirigir a una ruta publica si el usuario no esta logueado y quiere acceder a una ruta privada
// o redirigir a una ruta privada si el usuario esta logueado y quiere acceder a una ruta publica
// o redirigir a una ruta privada si el usuario esta logueado y quiere acceder a una ruta privada pero no tiene el rol necesario
// o redirigir a una ruta publica si el usuario no esta logueado y quiere acceder a una ruta publica
// o redirigir a una ruta privada si el usuario esta logueado y quiere acceder a una ruta privada y tiene el rol necesario
const PrivateValidationFragment = <Outlet />
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.PRIVATE} />

export const AuthGuard = ({ privateValidation }: Props) => {
  const userState = useSelector((store: AppStore) => store.user)
  return userState.jwtToken ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  )
}

export default AuthGuard
