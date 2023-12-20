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
import Image from 'next/image'
import React, { useState } from 'react'
import * as Yup from 'yup'

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
  const [couponCode, setCouponCode] = useState<string>('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const promoValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('სახელი is required'),
    lastName: Yup.string().required('გვარი is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'ტელეფონის ნომერი must be a valid number')
      .required('ტელეფონის ნომერი is required')
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
          number: values.phoneNumber
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
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...modalStyle,
          width: { sx: 'calc(100vw - 32px)', md: '584px' },
          borderRadius: '10px'
        }}
      >
        <Image
          src={selectedPromo?.image || ''}
          alt="Promo"
          width={isMobile ? 180 : 220}
          height={isMobile ? 180 : 220}
        />

        <Typography textAlign="center" variant="h6" fontWeight={'650'}>
          {selectedPromo?.title}
        </Typography>
        <Typography textAlign="center">{selectedPromo?.description}</Typography>
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
              onClick={onClose}
              variant="contained"
              color="primary"
              style={{ marginTop: 16, alignSelf: 'center' }}
            >
              დახურვა
            </Button>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default PromoModal
