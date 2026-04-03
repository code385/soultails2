import { NextResponse } from 'next/server'

// Stripe payments removed — Claudia sends PayPal links manually
export async function POST() {
  return NextResponse.json({ received: true })
}

export const dynamic = 'force-dynamic'
