import { Gift, fetchFAQs, fetchGifts } from '@/api'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('@/components/Header/Header'), {
  loading: () => <p>Loading...</p>
})

const DynamicGiftContainer = dynamic(
  () => import('@/components/GiftContainer/GiftContainer'),
  {
    loading: () => <p>Loading...</p>
  }
)

const DynamicResponsiveAccordion = dynamic(
  () => import('@/components/ResponsiveAccordion/ResponsiveAccordion'),
  {
    loading: () => <p>Loading...</p>
  }
)

export const revalidate = 60

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

export default async function Home() {
  const { data } = await fetchGifts()
  const { data: faqData } = await fetchFAQs()

  const shuffled = shuffleArray([...data]) // Assuming 'data' is your original array

  return (
    <Box style={{}}>
      <DynamicHeader />
      <DynamicGiftContainer data={shuffled} />
      <Box
        sx={{
          padding: { xs: '24px 16px', md: '60px' },
          backgroundColor: '#103B5E'
        }}
      >
        <Typography
          sx={{ fontSize: { xs: 20, md: 30 } }}
          variant="h2"
          color="white"
        >
          ხშირად დასმული კითხვები
        </Typography>
        <Box sx={{ marginTop: { xs: '36px', md: '80px' } }}>
          <DynamicResponsiveAccordion
            title={'რა საჩუქრები შეიძლება მოვიგო?'}
            answer={`${data?.map(
              (gift, index) => `<p>${index + 1}. ${gift.title}</p>`
            )}`.replaceAll(',', '')}
          />
          {faqData?.map((item, ind) => (
            <DynamicResponsiveAccordion
              key={ind.toString()}
              title={item.question}
              answer={item.answer}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
