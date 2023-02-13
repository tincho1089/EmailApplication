import { createUserAdapter } from '@/adapters'
import { logIn } from '@/services'
import { Link } from '@mui/material'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes, User } from '../../models'
import { createUser, resetUser } from '../../redux/states/user'
import { clearLocalStorage } from '../../utilities'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()
  const onSubmit: SubmitHandler<User> = (data) => tryLogIn(data)

  useEffect(() => {
    clearLocalStorage()
    dispatch(resetUser())
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true })
  }, [])

  const tryLogIn = async (login: User) => {
    const data = await logIn(login)
    dispatch(createUser(createUserAdapter({ jwtToken: data.jwtToken, username: login.username })))
    navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.MYEMAILS}`, { replace: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Log In Form</h1>
      <label htmlFor='username'>User Name</label>
      <input
        aria-label='username'
        placeholder='username'
        {...register('username', { required: true })}
        aria-invalid={errors.username ? 'true' : 'false'}
      />
      {errors.username?.type === 'required' && <p role='alert'>Username is required</p>}
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        placeholder='password'
        type='password'
        {...register('password', {
          required: 'password is required',
          minLength: {
            value: 4,
            message: 'Password too short',
          },
        })}
        aria-invalid={errors.password ? 'true' : 'false'}
      />
      {errors.password && <p role='alert'>{errors.password?.message}</p>}

      <div style={{ color: 'red' }}>{Object.keys(errors).length > 0 && 'There are errors, please correct them.'}</div>
      <input type='submit' value='Log In' />
      <Link color='#dce5f2' underline='hover' onClick={() => navigate(`/${PublicRoutes.SIGNIN}`, { replace: true })}>
        {'SIGN IN'}
      </Link>
    </form>
  )
}
export default Login
