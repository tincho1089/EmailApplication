import { signIn } from '@/services'
import { Link } from '@mui/material'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PublicRoutes, User } from '../../models'
import { resetUser } from '../../redux/states/user'
import { clearLocalStorage } from '../../utilities'

function Signin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()
  const onSubmit: SubmitHandler<User> = (data) => trySignIn(data)

  useEffect(() => {
    clearLocalStorage()
    dispatch(resetUser())
    navigate(`/${PublicRoutes.SIGNIN}`, { replace: true })
  }, [])

  const trySignIn = async (Signin: User) => {
    await signIn(Signin)
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In Form</h1>
      <label htmlFor='name'>Name</label>
      <input aria-label='name' placeholder='name' {...register('name', { required: true })} aria-invalid={errors.name ? 'true' : 'false'} />
      {errors.name?.type === 'required' && <p role='alert'>Name is required</p>}
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

      <div style={{ color: 'red' }}>{Object.keys(errors).length > 0 && 'There are errors in the form. Please correct them.'}</div>
      <input type='submit' value='Sign In' />
      <Link color='#dce5f2' underline='hover' onClick={() => navigate(`/${PublicRoutes.LOGIN}`, { replace: true })}>
        {'LOG IN'}
      </Link>
    </form>
  )
}
export default Signin
