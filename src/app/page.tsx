import { fetchFAQs, fetchGifts } from '@/api'
import GiftContainer from '@/components/GiftContainer/GiftContainer'
import Header from '@/components/Header/Header'
import ResponsiveAccordion from '@/components/ResponsiveAccordion/ResponsiveAccordion'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

export const revalidate = 60

export default async function Home() {
  const { data } = await fetchGifts()
  const { data: faqData } = await fetchFAQs()
  return (
    <Box style={{}}>
      <Header></Header>
      <GiftContainer data={data} />
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
          <ResponsiveAccordion
            title={'რა საჩუქრები შეიძლება მოვიგო?'}
            answer={`${data?.map(
              (gift, index) => `<p>${index+1}. ${gift.title}</p>`
            )}`.replaceAll(',', '')}
          />
          {faqData?.map((item, ind) => (
            <ResponsiveAccordion
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
