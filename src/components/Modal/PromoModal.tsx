import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'

interface PromoModalProps {
  open: boolean
  onClose: () => void
}

const PromoModal: React.FC<PromoModalProps> = ({ open, onClose }) => {
  const [submitted, setSubmitted] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Process form data here and generate promo code
    const generatedPromoCode = 'PROMO2023'
    setPromoCode(generatedPromoCode)
    setSubmitted(true)
  }

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...modalStyle,
          width: { sx: 'calc(100vw - 32px)', md: '584px' },
          borderRadius: '10px'
        }}
      >
        {!submitted ? (
          <>
            <Image
              src="/testgift.jpeg"
              alt="Promo"
              width={isMobile ? 180 : 220}
              height={isMobile ? 180 : 220}
            />

            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: isMobile ? '252px' : '350px',
                marginTop: '40px'
              }}
            >
              <TextField label="სახელი" variant="outlined" required />
              <TextField label="გვარი" variant="outlined" required />
              <TextField label="ტელეფონის ნომერი" variant="outlined" required />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 16, alignSelf: 'center' }}
              >
                მიიღე კოდი
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              component="h2"
              style={{ marginBottom: 16, textAlign: 'center' }}
            >
              ვაუჩერის კოდი
            </Typography>
            <Typography variant="h5" component="h3">
              123456
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default PromoModal
