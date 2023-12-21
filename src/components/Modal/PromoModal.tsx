import { Gift } from '@/api'
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import html2canvas from 'html2canvas'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import * as Yup from 'yup'

function base64ToBlob(base64: string, mimeType: string) {
  const bytes = atob(base64.split(',')[1])
  const arr = new Uint8Array(bytes.length)

  for (let i = 0; i < bytes.length; i++) {
    arr[i] = bytes.charCodeAt(i)
  }

  return new Blob([arr], { type: mimeType })
}

interface FormValues {
  firstName: string
  lastName: string
  phoneNumber: string
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  phoneNumber: ''
}

interface PromoModalProps {
  open: boolean
  onClose: () => void
  selectedPromo: Gift | undefined
}

const PromoModal: React.FC<PromoModalProps> = ({
  open,
  onClose,
  selectedPromo
}) => {
  const router = useRouter()
  const [promoImage, setPromoImage] = useState<string>('')
  const [shareToFriend, setShareToFriend] = useState<boolean>(false)
  const modalRef = useRef(null)

  const [couponCode, setCouponCode] = useState<string>('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const takeScreenshot = () => {
    if (modalRef.current) {
      console.log(modalRef.current)
      html2canvas(modalRef.current, {
        useCORS: true, // Attempt to load images with CORS enabled
        allowTaint: false // Prevents tainting the canvas
        // Other options...
      }).then(async (canvas) => {
        // Rest of your code remains the same

        const image = canvas.toDataURL('image/png', 1.0)
        const file = base64ToBlob(image, 'image/jpeg')

        const formData = new FormData()
        formData.append('image', file, 'jaokeni_coupon.png')
        const response = await axios({
          method: 'post',
          url: 'https://api.jaokeni.ge/api/upload-image',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        router.push(response.data?.image)

        setShareToFriend(true)
      })
    }
  }

  const promoValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('სახელი შეყვანა სავალდებულოა'),
    lastName: Yup.string().required('გვარის შეყვანა სავალდებულოა'),
    phoneNumber: Yup.string()
      .matches(
        /^\+995\s*\d{1,3}\s*\d{1,3}\s*\d{1,3}$|^\d{1,3}\s*\d{1,3}\s*\d{1,3}$/,
        'ტელეფონის ნომერი უნდა იყოს ვალიდური (503123456) ან (+995502123456'
      )
      .required('ტელეფონის ნომერის შეყვანა სავალდებულოა')
  })

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const response = await axios.post(
        'https://api.jaokeni.ge/api/gifts/register-gift',
        {
          name: values.firstName,
          lastname: values.lastName,
          gift_id: selectedPromo?.id,
          number: values.phoneNumber.replaceAll(' ', '')
        }
      )

      setCouponCode(response.data?.data?.customer?.coupon_code)
      // Handle the response as needed
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSubmitting(false)
      resetForm()
    }
  }

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            ...modalStyle,
            width: { xs: 'calc(100vw - 32px)', md: '584px' },
            borderRadius: '10px'
          }}
        >
          <Image
            src={selectedPromo?.image || ''}
            alt="Promo"
            width={isMobile ? 180 : 220}
            height={isMobile ? 180 : 220}
          />
          {couponCode?.length ? (
            <Typography
              style={{ marginBottom: '8px' }}
              textAlign="center"
              variant="h4"
              fontWeight={'650'}
            >
              გილოცავთ!
            </Typography>
          ) : null}
          {couponCode?.length ? (
            <Typography
              style={{ marginBottom: '8px' }}
              textAlign="center"
              variant="h6"
              fontWeight={'650'}
            >
              საჩუქრის მისაღებად შეინახეთ ვაუჩერის კოდი
            </Typography>
          ) : (
            <Box sx={{ backgroundColor: '#FDD106' }}>
              <Typography
                style={{ marginBottom: '8px' }}
                textAlign="center"
                variant="h6"
                fontWeight={'650'}
              >
                {selectedPromo?.title}
              </Typography>
            </Box>
          )}
          {!couponCode?.length ? (
            <Formik
              initialValues={initialValues}
              validationSchema={promoValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    width: isMobile ? '252px' : '350px',
                    marginTop: '40px'
                  }}
                >
                  <Field
                    name="firstName"
                    as={TextField}
                    label="სახელი"
                    variant="outlined"
                    required
                  />
                  <ErrorMessage name="firstName" component="div" />

                  <Field
                    name="lastName"
                    as={TextField}
                    label="გვარი"
                    variant="outlined"
                    required
                  />
                  <ErrorMessage name="lastName" component="div" />

                  <Field
                    name="phoneNumber"
                    as={TextField}
                    label="ტელეფონის ნომერი"
                    variant="outlined"
                    required
                  />
                  <ErrorMessage name="phoneNumber" component="div" />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 16, alignSelf: 'center' }}
                    disabled={isSubmitting}
                  >
                    მიიღე კოდი
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <Typography variant="h4">{couponCode}</Typography>
              <Button
                onClick={takeScreenshot}
                variant="contained"
                color="primary"
                style={{ marginTop: 16, alignSelf: 'center' }}
              >
                შენახვა
              </Button>
            </>
          )}
        </Box>
      </Modal>
      <Box
        ref={modalRef}
        style={{
          padding: 20,
          position: 'absolute',
          bottom: '4000px',
          backgroundImage: 'url(/giftbg-mobile.png)'
        }}
      >
        <img
          src={`/${selectedPromo?.id}.png`}
          alt="Promo"
          width={440}
          height={440}
          style={{ objectFit: 'contain' }}
        />
        {couponCode?.length ? (
          <Typography
            style={{ marginBottom: '8px' }}
            textAlign="center"
            variant="h4"
            fontWeight={'650'}
          >
            გილოცავთ!
          </Typography>
        ) : null}
        <Typography
          style={{ marginBottom: '8px' }}
          textAlign="center"
          variant="h6"
          fontWeight={'650'}
        >
          {couponCode?.length
            ? 'საჩუქრის მისაღებად შეინახეთ ვაუჩერის კოდი'
            : selectedPromo?.title}
        </Typography>
        <Typography variant="h4">{couponCode}</Typography>
      </Box>
    </>
  )
}

export default PromoModal
