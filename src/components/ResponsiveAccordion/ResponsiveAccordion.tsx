'use client'
import AddIcon from '@mui/icons-material/Add'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@mui/material'

type Props = {
  title: string
  answer: string
}

const titleStyle = {
  color: '#FFF',
  fontFamily: 'Helvetica Neue',
  fontStyle: 'normal',
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

const ResponsiveAccordion = ({ title, answer }: Props) => {
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
        <Typography
          sx={{
            ...titleStyle,
            fontWeight: { xs: 500, md: 700 },
            lineHeight: { xs: '20px', md: '28px' },
            fontSize: { xs: '14px', md: '20px' }
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0, marginBottom: '24px' }}>
        <Typography
          component="div"
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
