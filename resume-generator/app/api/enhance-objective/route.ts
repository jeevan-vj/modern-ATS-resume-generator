import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const { objective, workExperience, education } = await req.json()

    const prompt = `Given the following information about a person:
    Current objective: "${objective}"
    Work Experience: ${JSON.stringify(workExperience)}
    Education: ${JSON.stringify(education)}

    Please generate 3 different professional and compelling career objectives (limited to 2-3 sentences each) that highlight their experience and aspirations. Make them ATS-friendly.`

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      n: 1,
      temperature: 0.7,
    })

    const suggestions = completion.choices[0].message.content
      ?.split('\n')
      .filter(line => line.trim().length > 0)
      .slice(0, 3) || []

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to enhance objective' }, { status: 500 })
  }
}
