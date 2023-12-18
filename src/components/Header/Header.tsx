import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

// Replace this with your logo import
import Image from 'next/image'

const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: '#00162C', padding: '15px 0' }}
    >
      <Toolbar style={{ justifyContent: 'center' }}>
        <Image src="/logo-desktop.png" alt="Logo" width={178} height={50} />
      </Toolbar>
    </AppBar>
  )
}

export default Header
