import { getEmailsAdapter } from '@/adapters'
import { Endpoints } from '@/models'
import { ApiEmail, newEmail } from '@/models/email.model'
import { listEmails } from '@/redux/states/email'
import { AppStore } from '@/redux/store'
import { SnackbarUtilities } from '@/utilities'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io, { Socket } from 'socket.io-client'
import { CustomProvider } from '../../context'

export interface SocketWrapperInterface {
  children: React.ReactNode
}

const SocketWrapper: React.FC<SocketWrapperInterface> = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const userState = useSelector((store: AppStore) => store.user)
  const emailState = useSelector((store: AppStore) => store.email)
  const dispatch = useDispatch()

  const send = (email: newEmail) => {
    socket?.emit('message', email)
  }

  const messageListener = (message: ApiEmail) => {
    const newEmail = getEmailsAdapter([message])
    dispatch(listEmails([...emailState, ...newEmail]))
    SnackbarUtilities.success(`A new message from ${message.from} has arrived!`)
  }

  useEffect(() => {
    const newSocket = io(Endpoints.socketConn)
    setSocket(newSocket)
  }, [setSocket])

  useEffect(() => {
    socket?.on(`message${userState.username}`, messageListener)
    return () => {
      socket?.off(`message${userState.username}`, messageListener)
    }
  }, [messageListener])

  return <CustomProvider emitMessage={send}>{children}</CustomProvider>
}

export default SocketWrapper
