'use client'

import Script from 'next/script'

export default function BotpressChat() {
  return (
    <Script
      src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"
      strategy="afterInteractive"
      onLoad={() => {
        const s = document.createElement('script')
        s.src =
          'https://files.bpcontent.cloud/2026/03/30/12/20260330125353-8PDMG0IH.js'
        document.body.appendChild(s)
      }}
    />
  )
}
