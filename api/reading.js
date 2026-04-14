export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt } = req.body

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        system: `You are Astroly, a wise and mystical AI astrologer. You provide deeply personal, poetic, and insightful astrological readings. Your tone is warm, mystical, and empowering. You combine traditional astrology with modern psychological insights. Never be generic — always make the reading feel personally crafted.`,
        messages: [{ role: 'user', content: prompt }]
      })
    })
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
