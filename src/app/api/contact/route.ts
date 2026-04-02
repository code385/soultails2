import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  petType: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    await prisma.contactMessage.create({ data })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[CONTACT]', err)
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
