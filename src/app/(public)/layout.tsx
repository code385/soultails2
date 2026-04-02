import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BotpressChat from '@/components/BotpressChat'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BotpressChat />
    </>
  )
}
