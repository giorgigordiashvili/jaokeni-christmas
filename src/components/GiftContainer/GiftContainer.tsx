'use client'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import PromoModal from '../Modal/PromoModal'

const GiftContainer: React.FC = () => {
  const [selectedPromo, setSelectedPromo] = useState<null | number>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const [selectedGifts, setSelectedGifts] = useState<number[]>([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSelectGift = (giftId: number) => {
    if (selectedGifts.includes(giftId) || selectedGifts.length >= 3) {
      if (selectedGifts.includes(giftId) && selectedGifts.length >= 3) {
        setSelectedPromo(giftId)
      }
      return
    }
    setSelectedGifts([...selectedGifts, giftId])
  }

  const isGiftSelected = (giftId: number) => selectedGifts.includes(giftId)

  return (
    <Box
      textAlign="center"
      p={2}
      sx={{
        backgroundImage: {
          xs: 'url(./giftbg-mobile.png)',
          md: 'url(./giftbg-desktop.png)'
        }
      }}
      style={{
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        paddingBottom: '140px'
      }}
    >
      <Typography
        variant="h1"
        sx={{
          marginTop: {
            xs: '16px',
            md: '40px'
          }
        }}
      >
        საჩუქრების ჯაოკენი
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          marginTop: {
            xs: '8px',
            md: '24px'
          }
        }}
      >
        {selectedGifts.length >= 3
          ? 'აირჩიეთ 3 საჩუქრიდან ერთერთი'
          : 'გახსენით 3 ჯაოკენის ყუთი'}
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: {
            xs: '32px',
            md: '40px'
          },
          maxWidth: '426px'
        }}
      >
        {Array.from({ length: 9 }, (_, i) => i + 1).map((giftId) => (
          <Grid item key={giftId} xs={4}>
            <Card
              onClick={() => handleSelectGift(giftId)}
              style={{
                position: 'relative',
                filter:
                  selectedGifts.length >= 3 && !isGiftSelected(giftId)
                    ? 'blur(4px)'
                    : 'none',
                opacity:
                  selectedGifts.length >= 3 && !isGiftSelected(giftId)
                    ? 0.3
                    : 1,
                transform: isGiftSelected(giftId)
                  ? 'rotateY(180deg)'
                  : 'rotateY(0deg)',
                transition: 'transform 0.6s, opacity 0.3s',
                border:
                  selectedPromo === giftId
                    ? '4px solid #FDD109'
                    : '4px solid transparent',
                boxShadow: 'none',
                overflow: 'visible'
              }}
            >
              {selectedPromo === giftId ? (
                <Box
                  sx={{
                    width: {
                      xs: '20px',
                      md: '24px'
                    },
                    height: {
                      xs: '20px',
                      md: '24px'
                    },
                    top: {
                      xs: '-10px',
                      md: '-12px'
                    },
                    left: {
                      xs: '-10px',
                      md: '-12px'
                    },
                    position: 'absolute',
                    zIndex: 5,
                    transform: isGiftSelected(giftId)
                      ? 'rotateY(180deg)'
                      : 'rotateY(0deg)'
                  }}
                >
                  <Image
                    src="/checkbox.png"
                    layout="fill"
                    alt="Test"
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
              ) : null}
              <CardActionArea
                style={{
                  height: '100%',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isGiftSelected(giftId) ? (
                  <Box
                    sx={{
                      position: 'relative',
                      width: { xs: '76px', md: '98px' },
                      height: { xs: '76px', md: '98px' }
                    }}
                  >
                    <Image
                      src="/testgift.png"
                      layout="fill"
                      alt="gift"
                      style={{
                        transform: isGiftSelected(giftId)
                          ? 'rotateY(180deg)'
                          : 'rotateY(0deg)'
                      }}
                    />
                  </Box>
                ) : (
                  <Image src="/gift.png" layout="fill" alt="gift" />
                )}
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedGifts.length >= 3 ? (
        <Button
          sx={{
            marginTop: {
              xs: '30px',
              md: '60px'
            }
          }}
          onClick={() => setModalOpen(true)}
          disabled={!selectedPromo}
        >
          აირჩიე
        </Button>
      ) : null}
      <PromoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  )
}

export default GiftContainer
