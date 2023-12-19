import GiftContainer from '@/components/GiftContainer/GiftContainer'
import Header from '@/components/Header/Header'
import ResponsiveAccordion from '@/components/ResponsiveAccordion/ResponsiveAccordion'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

export default function Home() {
  return (
    <Box style={{}}>
      <Header></Header>
      <GiftContainer />
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
          <ResponsiveAccordion title="ხშირად დასმული კითხვები" answer="test" />
          <ResponsiveAccordion title="ხშირად დასმული კითხვები" answer="test" />
        </Box>
      </Box>
    </Box>
  )
}
