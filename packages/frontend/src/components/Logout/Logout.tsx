import { PublicRoutes } from '@/models'
import { resetUser } from '@/redux/states/user'
import { clearLocalStorage } from '@/utilities'
import { MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logOut = () => {
    clearLocalStorage()
    dispatch(resetUser())
    navigate(PublicRoutes.LOGIN, { replace: true })
  }
  return <MenuItem onClick={logOut}>Log Out</MenuItem>
}
export default Logout
