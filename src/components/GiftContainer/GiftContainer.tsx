'use client'
import { Gift } from '@/api'
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
import { useEffect, useState } from 'react'
import PromoModal from '../Modal/PromoModal'
const { default: NextImage } = require('next/image')

type Props = { data: Gift[] }
const GiftContainer = ({ data }: Props) => {
  const [shuffledData, setShuffledData] = useState<Gift[]>([])

  const [selectedPromo, setSelectedPromo] = useState<null | number>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const [selectedGifts, setSelectedGifts] = useState<number[]>([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const swapGifts = (clickedGiftId: number) => {
    // Find the index of the gift with id 7
    const id7Index = shuffledData.findIndex((gift) => gift.id === 7)
    // Find the index of the clicked gift
    const clickedIndex = shuffledData.findIndex(
      (gift) => gift.id === clickedGiftId
    )

    // Swap the gifts
    ;[shuffledData[id7Index], shuffledData[clickedIndex]] = [
      shuffledData[clickedIndex],
      shuffledData[id7Index]
    ]

    // Update the state with the new order
    setShuffledData([...shuffledData])
  }

  const handleSelectGift = (giftId: number) => {
    if (selectedGifts.length === 2 && !selectedPromo) {
      setSelectedPromo(7)
    }
    // Check if no gifts have been selected yet
    if (selectedGifts.length === 0) {
      swapGifts(giftId)

      setSelectedGifts([7])
    } else {
      // Normal behavior for subsequent selections
      if (selectedGifts.includes(giftId) || selectedGifts.length >= 3) {
        if (selectedGifts.includes(giftId) && selectedGifts.length >= 3) {
          setSelectedPromo(giftId)
        }
        return
      }
      setSelectedGifts([...selectedGifts, giftId])
    }
  }

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

  // Shuffle data on mount
  useEffect(() => {
    const shuffled = shuffleArray([...data]) // Assuming 'data' is your original array
    setShuffledData(shuffled)
  }, [])

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
            აირჩიე
          </Typography>
          <Typography
            variant="h1"
            sx={{
              marginTop: 0
            }}
          >
            ერთ-ერთი
          </Typography>
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
        <>
          <Typography
            fontWeight="750"
            variant="subtitle1"
            sx={{
              marginTop: {
                xs: '8px',
                md: '24px'
              }
            }}
          >
            {data.find((it) => it.id === selectedPromo)?.title}
          </Typography>
        </>
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
          marginTop: {
            xs: '32px',
            md: '40px'
          },
          maxWidth: {
            xs: '100%',
            md: '426px'
          }
        }}
      >
        {shuffledData.map((gift) => (
          <Grid item key={gift.id}>
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
                    src="/checkbox.png"
                    layout="fill"
                    alt="Test"
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
                      width: { xs: '90px', md: '98px' },
                      height: { xs: '90px', md: '98px' }
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
                  <NextImage src="/gift.png" layout="fill" alt="gift" />
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
