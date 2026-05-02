const NTFY_TOPIC = process.env.NTFY_TOPIC

export async function notifyAdmin(title: string, message: string, priority: 'default' | 'high' = 'high'): Promise<void> {
  if (!NTFY_TOPIC) return

  try {
    await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: 'POST',
      headers: {
        'Title': title,
        'Priority': priority,
        'Tags': 'soultails',
        'Content-Type': 'text/plain',
      },
      body: message,
    })
  } catch (err) {
    console.error('[NTFY]', err)
  }
}
