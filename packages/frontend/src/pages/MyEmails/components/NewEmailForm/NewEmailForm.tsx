import { newEmail } from '@/models'
import { EmptyEmailState } from '@/redux/states/email'
import { sendEmail } from '@/services'
import { sharingInformationService } from '@/utilities'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCustomContext } from '../../context'

function NewEmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<newEmail>()
  const onSubmit: SubmitHandler<newEmail> = (data) => trySendEmail(data)
  const { emitMessage } = useCustomContext()

  const trySendEmail = async (email: newEmail) => {
    const { data } = await sendEmail(email)
    emitMessage(data)
    sharingInformationService.setSubject(false)
    reset(EmptyEmailState[0])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>New Email Form</h1>
      <label htmlFor='To'>To</label>
      <input aria-label='to' placeholder='To' {...register('to', { required: true })} aria-invalid={errors.to ? 'true' : 'false'} />
      {errors.to?.type === 'required' && <p role='alert'>Receiver is required</p>}
      <label htmlFor='Subject'>Subject</label>
      <input
        aria-label='subject'
        placeholder='Subject'
        {...register('subject', { required: true })}
        aria-invalid={errors.subject ? 'true' : 'false'}
      />
      {errors.subject?.type === 'required' && <p role='alert'>Subject is required</p>}
      <label htmlFor='Body'>Body</label>
      <input aria-label='body' placeholder='Body' {...register('body', { required: true })} aria-invalid={errors.body ? 'true' : 'false'} />
      {errors.body?.type === 'required' && <p role='alert'>Body is required</p>}
      <div style={{ color: 'red' }}>{Object.keys(errors).length > 0 && 'There are errors, please correct them.'}</div>
      <input type='submit' value='Send Email' />
    </form>
  )
}
export default NewEmailForm
