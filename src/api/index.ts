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
    'https://api.jaokeni.ge/api/gifts'
  )
  return data
}

export const fetchFAQs = async () => {
  const { data } = await axios.get<FAQResponse>(
    'https://api.jaokeni.ge/api/faq'
  )
  return data
}
