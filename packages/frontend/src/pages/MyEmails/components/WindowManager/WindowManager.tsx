import { getEmailsAdapter } from '@/adapters'
import { CustomDataGrid, CustomModal, CustomPaper } from '@/components'
import { Email, inboxGrid, PrivateRoutes } from '@/models'
import { listEmails } from '@/redux/states/email'
import { AppStore } from '@/redux/store'
import { getEmails } from '@/services/email.service'
import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { NewEmailButton } from '../NewEmailButton'
import { NewEmailForm } from '../NewEmailForm'

function WindowManager() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const folder = state?.folder || 'Inbox'
  const emailState = useSelector((store: AppStore) => store.email)
  const dispatch = useDispatch()

  useEffect(() => {
    loadEmails(folder)
  }, [state])

  const loadEmails = async (folder: string) => {
    const data = await getEmails(folder)
    dispatch(listEmails(getEmailsAdapter(data)))
  }

  const handleClick = (params: Email) => {
    navigate(`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.VIEWEMAIL}`, { state: { email: params } })
  }

  return (
    <div style={{ marginTop: '10%' }}>
      <CustomPaper>
        <Typography variant='h3' component='h4'>
          {' '}
          {`${folder} Emails`}{' '}
        </Typography>
        <CustomDataGrid columns={inboxGrid} rows={emailState} handleClick={handleClick} />
        <div style={{ justifyContent: 'end', display: 'flex', margin: '2px' }}>
          <NewEmailButton></NewEmailButton>
        </div>
        <CustomModal>
          <NewEmailForm />
        </CustomModal>
      </CustomPaper>
    </div>
  )
}

export default WindowManager
