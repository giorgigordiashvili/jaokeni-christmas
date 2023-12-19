import GiftContainer from '@/components/GiftContainer/GiftContainer'
import Header from '@/components/Header/Header'
import ResponsiveAccordion from '@/components/ResponsiveAccordion/ResponsiveAccordion'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
const faqData = [
  {
    id: 5,
    question: 'სად შემიძლია დავათვალიერო კატალოგი?',
    answer:
      '<p>კატალოგი შეგიძლიათ იხილოთ აქ <span role="gridcell"><a class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 xggy1nq x1a2a7pz xt0b8zv x1heor9g x1bvjpef" tabindex="-1" role="link" href="https://jaokeni.ge/?fbclid=IwAR19yEOlSzhuoFWray1U4xgybZl2PMCEcIMhRBVU84RdLbU_HOWqO5rvW8M" target="_blank" rel="nofollow noopener noreferrer">https://jaokeni.ge/</a></span></p>'
  },
  {
    id: 4,
    question: 'სამუშაო საათები?',
    answer: '<p>ჯაოკენის ფილიალები მუშაობს 09:30-დან 18:30-მდე.</p>'
  },
  {
    id: 3,
    question: 'სად შემიძლია გამოვიყენო ვაუჩერი?',
    answer:
      '<p>ვაუჩერის გამოყენება შეგიძლიათ ჩვენს ნებისმიერ ფილიალში:</p>\r\n<p>➣ თბილისი : აღმაშენებლის ხეივანი 180</p>\r\n<p>➣ ქუთაისი: ნიკეას ქ.42</p>\r\n<p>➣ სენაკი: ჭყონდიდელის ქ.10</p>\r\n<p>➣ ბათუმი: შავშეთის ქ.60</p>\r\n<p>➣ თელავი: დავითაშვილის ქ.4&nbsp;</p>\r\n<p><span class="x3nfvp2 x1j61x8r x1fcty0u xdj266r xhhsvwb xat24cr xgzva0m xxymvpz xlup9mm x1kky2od"><img class="xz74otr" src="https://static.xx.fbcdn.net/images/emoji.php/v9/t4d/1/16/1f4de.png" alt="📞" width="16" height="16"></span> *77 00</p>'
  },
  {
    id: 2,
    question: 'როდემდეა აქცია?',
    answer:
      '<p>ჯაოკენის საახალწლო აქცია 23 დეკემბრიდან 30 დეკემბრის ჩათვლით იმოქმედებს.</p>'
  }
]

export default async function Home() {
  // const { data } = await fetchGifts()
  // const { data: faqData } = await fetchFAQs()
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
