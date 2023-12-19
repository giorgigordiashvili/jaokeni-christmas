import axios from 'axios'

export interface Gift {
  id: number
  title: string
  description: string
  image: string
}

export interface GiftsResponse {
  data: Gift[]
}

export interface FAQ {
  id: number
  question: string
  answer: string
}

export interface FAQResponse {
  data: FAQ[]
}

// Function to fetch gifts data
export const fetchGifts = async (): Promise<GiftsResponse> => {
  const { data } = await axios.get<GiftsResponse>(
    'http://207.154.192.95/api/gifts'
  )
  return data
}

export const fetchFAQs = async () => {
  const { data } = await axios.get<FAQResponse>('http://207.154.192.95/api/faq')
  return data
}
