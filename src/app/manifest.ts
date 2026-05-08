import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Soultails Veterinary Care',
    short_name: 'Soultails',
    description: 'Expert integrative veterinary care for cats, dogs and senior pets.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFAF7',
    theme_color: '#C85B6E',
    icons: [
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
