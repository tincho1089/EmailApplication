import { getEmailsAdapter } from '@/adapters'
import { CustomButton, CustomPaper } from '@/components'
import { Email, EmailStates } from '@/models'
import { EmptyEmailState } from '@/redux/states/email'
import { AppStore } from '@/redux/store'
import { updateEmail } from '@/services'
import { SnackbarUtilities } from '@/utilities'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

function ViewEmail() {
  const userState = useSelector((store: AppStore) => store.user)
  const navigate = useNavigate()
  const { state } = useLocation()

  const [currentEmail, setCurrentEmail] = useState<Email>(EmptyEmailState[0])

  useEffect(() => {
    setCurrentEmail(state.email)
    return () => {
      setCurrentEmail(EmptyEmailState[0])
    }
  }, [state])

  const tryUpdateEmail = async (state: string) => {
    const { data } = await updateEmail(currentEmail.id, state)
    const emailModified = getEmailsAdapter([data])
    SnackbarUtilities.success(`Message from ${emailModified[0].from} has been marked as ${state}!`)
    navigate(-1)
  }
  return (
    <CustomPaper>
      <h2> {currentEmail?.subject} </h2>
      <h5 style={{ margin: '0px', textAlign: 'left', marginLeft: '5px' }}> {`From: ${currentEmail.from} `} </h5>
      <h5 style={{ margin: '0px', textAlign: 'left', marginLeft: '5px' }}> {`to: ${currentEmail.to} `} </h5>
      <h4 style={{ margin: '0px', textAlign: 'left', marginLeft: '5px' }}> {`Message: ${currentEmail.body} `} </h4>
      <div
        style={{
          color: 'white',
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          justifyContent: 'flex-end',
          padding: '10px',
        }}
      >
        {currentEmail.to == userState.username && (
          <>
            <CustomButton onClick={() => tryUpdateEmail(EmailStates.READ)}>Mark as Read </CustomButton>
            <CustomButton onClick={() => tryUpdateEmail(EmailStates.REMOVED)}>Remove </CustomButton>
          </>
        )}
        <CustomButton onClick={() => navigate(-1)}>Return </CustomButton>
      </div>
    </CustomPaper>
  )
}
export default ViewEmail
