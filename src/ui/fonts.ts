import { Lusitana, Montserrat, Roboto } from 'next/font/google'

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400'],
})

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
})