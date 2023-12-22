'use client'
import { Gift, fetchGifts } from '@/api'
import CachedIcon from '@mui/icons-material/Cached'
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Grid,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import PromoModal from '../Modal/PromoModal'
const { default: NextImage } = require('next/image')

const shuffleArray = (array: Gift[]): Gift[] => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }

  return array
}

type Props = { data: Gift[] }
const GiftContainer = ({ data }: Props) => {
  const [shuffledData, setShuffledData] = useState<Gift[]>(data)

  const [selectedPromo, setSelectedPromo] = useState<null | number>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const [selectedGifts, setSelectedGifts] = useState<number[]>([])

  const handleSelectGift = (giftId: number) => {
    // Normal behavior for subsequent selections
    if (selectedGifts.includes(giftId) || selectedGifts.length >= 3) {
      if (selectedGifts.includes(giftId) && selectedGifts.length >= 3) {
        setSelectedPromo(giftId)
      }
      return
    }
    setSelectedGifts([...selectedGifts, giftId])
  }

  useEffect(() => {
    shuffledData.forEach((gift) => {
      const img = new Image()
      img.src = gift.image
    })
  }, [shuffledData])

  const isGiftSelected = (giftId: number) => selectedGifts.includes(giftId)

  return (
    <Box
      textAlign="center"
      p={2}
      sx={{
        backgroundImage: {
          xs: 'url(./giftbg-mobile.webp)',
          md: 'url(./giftbg-desktop.webp)'
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
      {selectedGifts.length === 3 ? (
        <>
          <Typography
            variant="h1"
            sx={{
              marginTop: {
                xs: '16px',
                md: '40px'
              }
            }}
          >
            აირჩიე ერთ-ერთი
          </Typography>
          <Button
            onClick={async () => {
              setSelectedGifts([])
              setSelectedPromo(null)
              const { data } = await fetchGifts()
              const shuffled = shuffleArray([...data]) // Assuming 'data' is your original array
              setShuffledData(shuffled)
            }}
            sx={{ backgroundColor: 'transparent' }}
            variant="text"
          >
            <CachedIcon fontSize="large" />
          </Button>
        </>
      ) : (
        <>
          <Typography
            variant="h1"
            sx={{
              marginTop: {
                xs: '16px',
                md: '40px'
              }
            }}
          >
            საახალწლო
          </Typography>
          <Typography
            variant="h1"
            sx={{
              marginTop: 0
            }}
          >
            საჩუქრები ყველასთვის
          </Typography>
        </>
      )}

      {selectedPromo ? (
        <Box
          sx={{
            height: '96px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              backgroundColor: '#FDD106',
              padding: 1,

              borderRadius: 2
            }}
          >
            <Typography fontWeight="750" variant="subtitle1">
              {data.find((it) => it.id === selectedPromo)?.title}
            </Typography>
          </Box>
        </Box>
      ) : selectedGifts.length < 3 ? (
        <Typography
          variant="subtitle1"
          sx={{
            marginTop: {
              xs: '8px',
              md: '24px'
            }
          }}
        >
          გახსენით ჯაოკენის 3 ყუთი
        </Typography>
      ) : null}

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          gridTemplateColumns: '1fr 1fr 1fr',
          maxWidth: {
            xs: '100%',
            md: '700px'
          }
        }}
      >
        {shuffledData.map((gift) => (
          <Grid
            style={{ textAlign: 'center', display: 'flex' }}
            justifyContent="center"
            alignItems="center"
            xs={4}
            item
            key={gift.id}
          >
            <Card
              onClick={() => handleSelectGift(gift.id)}
              style={{
                position: 'relative',
                filter:
                  selectedGifts.length >= 3 && !isGiftSelected(gift.id)
                    ? 'blur(4px)'
                    : 'none',
                opacity:
                  selectedGifts.length >= 3 && !isGiftSelected(gift.id)
                    ? 0.3
                    : 1,
                transform: isGiftSelected(gift.id)
                  ? 'rotateY(180deg)'
                  : 'rotateY(0deg)',
                transition: 'transform 0.6s, opacity 0.3s',
                border:
                  selectedPromo === gift.id
                    ? '4px solid #FDD109'
                    : '4px solid transparent',
                boxShadow: 'none',
                overflow: 'visible'
              }}
            >
              {selectedPromo === gift.id ? (
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
                    transform: isGiftSelected(gift.id)
                      ? 'rotateY(180deg)'
                      : 'rotateY(0deg)'
                  }}
                >
                  <NextImage
                    src="/checkbox.webp"
                    fill
                    alt="Test"
                    sizes="100%"
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
              ) : null}
              <CardActionArea
                disableRipple
                style={{
                  height: '100%',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isGiftSelected(gift.id) ? (
                  <Box
                    sx={{
                      position: 'relative',
                      width: { xs: '100%', md: '100%' },
                      height: { xs: '100%', md: '100%' }
                    }}
                  >
                    <img
                      src={gift.image}
                      alt="gift"
                      style={{
                        width: '100%',
                        height: '100%',
                        transform: isGiftSelected(gift.id)
                          ? 'rotateY(180deg)'
                          : 'rotateY(0deg)'
                      }}
                    />
                  </Box>
                ) : (
                  <NextImage
                    src="/gift-golden.webp"
                    sizes="100%"
                    fill
                    alt="gift"
                  />
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
      <PromoModal
        selectedPromo={shuffledData.find((it) => it.id === selectedPromo)}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  )
}

export default GiftContainer
