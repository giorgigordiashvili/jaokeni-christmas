import GiftContainer from '@/components/GiftContainer/GiftContainer'
import Header from '@/components/Header/Header'
import ResponsiveAccordion from '@/components/ResponsiveAccordion/ResponsiveAccordion'
import Box from '@mui/material/Box'

export default function Home() {
  return (
    <Box style={{}}>
      <Header></Header>
      <GiftContainer />
      <ResponsiveAccordion title="ხშირად დასმული კითხვები" children="test" />
      <ResponsiveAccordion title="ხშირად დასმული კითხვები" children="test" />
    </Box>
  )
}
