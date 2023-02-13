import { Email, PrivateRoutes } from '@/models'
import { AppStore } from '@/redux/store'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import { Badge } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Logout } from '../Logout'
import MailIcon from '@mui/icons-material/Mail'
import { useEffect } from 'react'

export default function MenuAppBar() {
  const userState = useSelector((store: AppStore) => store.user)
  const emailState = useSelector((store: AppStore) => store.email)
  const emailsUnread = emailState.filter((email: Email) => email.state === 'unread' && email.to === userState.username)
  const navigate = useNavigate()
  const [emails, setEmails] = React.useState<Email[]>([])

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    setEmails(emailsUnread)
  }, [emailState])

  return (
    <Box sx={{ flexGrow: 1 }} style={{ position: 'absolute', top: 0, left: 0, width: '-webkit-fill-available' }}>
      <AppBar position='static' style={{ backgroundColor: '#bf1650' }}>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Email App
          </Typography>
          {userState.username && (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <label style={{ marginRight: '5px', marginBottom: '20px' }}>{userState.username}</label>
              <MenuItem>
                <IconButton
                  size='large'
                  aria-label='show new mails'
                  color='inherit'
                  onClick={() => navigate(`${PrivateRoutes.PRIVATE}/${PrivateRoutes.MYEMAILS}`, { state: { folder: 'Inbox' } })}
                >
                  <Badge badgeContent={emails.length} color='warning'>
                    <MailIcon />
                  </Badge>
                </IconButton>
              </MenuItem>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate(`${PrivateRoutes.PRIVATE}/${PrivateRoutes.MYEMAILS}`, { state: { folder: 'Inbox' } })}>
                  Inbox
                </MenuItem>
                <MenuItem onClick={() => navigate(`${PrivateRoutes.PRIVATE}/${PrivateRoutes.MYEMAILS}`, { state: { folder: 'Sent' } })}>
                  Sent
                </MenuItem>
                <MenuItem onClick={() => navigate(`${PrivateRoutes.PRIVATE}/${PrivateRoutes.MYEMAILS}`, { state: { folder: 'Removed' } })}>
                  Removed
                </MenuItem>
                <Logout />
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
