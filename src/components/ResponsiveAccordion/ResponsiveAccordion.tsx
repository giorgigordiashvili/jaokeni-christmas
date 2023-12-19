'use client'
import AddIcon from '@mui/icons-material/Add'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'

type Props = {
  title: string
  answer: string
}
const ResponsiveAccordion = ({ title, answer }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const titleStyle = {
    color: '#FFF',
    fontFamily: 'Helvetica Neue',
    fontSize: isMobile ? '14px' : '20px',
    fontStyle: 'normal',
    fontWeight: isMobile ? 500 : 700,
    lineHeight: isMobile ? '20px' : '28px', // 142.857% for mobile, 140% for desktop
    textTransform: 'uppercase'
  }

  const answerStyle = {
    color: '#FFF',
    fontFamily: 'Helvetica Neue',
    fontSize: {
      sx: '12px',
      md: '16px'
    },
    fontStyle: 'normal',
    fontWeight: {
      sx: '300',
      md: '500'
    },
    lineHeight: {
      sx: '18px',
      md: '28px'
    }
  }

  return (
    <Accordion
      disableGutters
      elevation={0}
      sx={{
        background: '#103B5E',
        borderBottom: '1px solid rgba(255,255,255,0.11)'
      }}
    >
      <AccordionSummary
        sx={{ padding: 0 }}
        expandIcon={<AddIcon color="secondary" />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <Typography sx={titleStyle}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0, marginBottom: '24px' }}>
        <Typography
          sx={answerStyle}
          dangerouslySetInnerHTML={{
            __html: answer
          }}
        />
      </AccordionDetails>
    </Accordion>
  )
}

export default ResponsiveAccordion
