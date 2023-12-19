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
import { useState } from 'react'
import PromoModal from '../Modal/PromoModal'
const { default: NextImage } = require('next/image')

const data = [
  {
    id: 7,
    title: '20% ფასდაკლება სრულ ასორტიმენტზე',
    description: 'გამოსაყენებლად წარმოადგინეთ პრომო კოდი ჯაოკენში',
    image: 'http://207.154.192.95/storage/8/5.png'
  },
  {
    id: 9,
    title: '25% ფასდაკლება საღებავების კატეგორიაზე',
    description: 'გამოსაყენებლად წარმოადგინეთ პრომო კოდი ჯაოკენში',
    image: 'http://207.154.192.95/storage/10/7.png'
  },
  {
    id: 11,
    title: '10000 ლარს ზემოთ 10% ფასდაკლება + 1000 ლარიანი ვაუჩერი',
    description: 'შეიძინე 10000 ლარზე მეტი ღირებულების პროდუქცია ჯაოკენში',
    image: 'http://207.154.192.95/storage/12/9.png'
  },
  {
    id: 3,
    title: '10000 ლარს ზემოთ 10% ფასდაკლება + 1000 ლარიანი ვაუჩერი',
    description: 'შეიძინე 10000 ლარზე მეტი ღირებულების პროდუქცია ჯაოკენში',
    image: 'http://207.154.192.95/storage/3/1.png'
  },
  {
    id: 5,
    title: '3000 ლარს ზემოთ 15% ფასდაკლება + 200 ლარიანი ვაუჩერი',
    description:
      'გამოსაყენებლად შეიძინე 1000 ლარზე მეტი ღირებულების პროდუქცია ჯაოკენში',
    image: 'http://207.154.192.95/storage/7/3.png'
  },
  {
    id: 8,
    title: '25% ფასდაკლება იტალიურ შპალერებზე',
    description: 'გამოსაყენებლად წარმოადგინეთ პრომო კოდი ჯაოკენში',
    image: 'http://207.154.192.95/storage/9/6.png'
  },
  {
    id: 4,
    title: '1000 ლარს ზემოთ 15% ფასდაკლება + 100 ლარიანი ვაუჩერი',
    description:
      'გამოსაყენებლად შეიძინე 1000 ლარზე მეტი ღირებულების პროდუქცია ჯაოკენში',
    image: 'http://207.154.192.95/storage/4/2.png'
  },
  {
    id: 10,
    title: '20% ფასდაკლება აბაზანის აქსესუარებზე',
    description: 'გამოსაყენებლად წარმოადგინეთ პრომო კოდი ჯაოკენში',
    image: 'http://207.154.192.95/storage/11/8.png'
  },
  {
    id: 6,
    title: '5000 ლარს ზემოთ 10% ფასდაკლება + 500 ლარიანი ვაუჩერი',
    description:
      'გამოსაყენებლად შეიძინე 5000 ლარზე მეტი ღირებულების პროდუქცია ჯაოკენში',
    image: 'http://207.154.192.95/storage/6/4.png'
  }
]

const GiftContainer = () => {
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

      {selectedPromo ? (
        <>
          <Typography
            variant="subtitle1"
            sx={{
              marginTop: {
                xs: '8px',
                md: '24px'
              }
            }}
          >
            თქვენ აირჩიეთ
          </Typography>
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
      ) : (
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
      )}
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
        {data.map((gift) => (
          <Grid item key={gift.id} xs={4}>
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
                      width: { xs: '76px', md: '98px' },
                      height: { xs: '76px', md: '98px' }
                    }}
                  >
                    <NextImage
                      priority={true}
                      src={gift.image}
                      layout="fill"
                      alt="gift"
                      style={{
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
      <PromoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  )
}

export default GiftContainer
