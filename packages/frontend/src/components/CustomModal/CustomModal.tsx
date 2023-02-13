import { sharingInformationService } from '@/utilities'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { style } from './styles/style'

export default function CustomModal({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false)
  const subscription$ = sharingInformationService.getSubject()
  useEffect(() => {
    subscription$.subscribe((data: any) => {
      setShowModal(data)
    })
  }, [])

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={showModal}
        onClose={() => setShowModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  )
}
