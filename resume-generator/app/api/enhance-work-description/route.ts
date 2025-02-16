import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  try {
    const { currentDescription, jobTitle, company } = await request.json()

    const prompt = `As an ATS-friendly resume expert, enhance the following work experience description for a ${jobTitle} position at ${company}. 
    Make it more impactful by:
    1. Adding measurable achievements
    2. Using action verbs
    3. Including relevant technical terms
    4. Focusing on results and impact
    5. Keeping it concise but detailed

    Original description:
    ${currentDescription}

    Please provide 3 different enhanced versions.`

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    })

    const suggestions = completion.choices[0].message.content
      ?.split('\n\n')
      .filter(suggestion => suggestion.trim().length > 0)
      .slice(0, 3) || []

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to enhance description' },
      { status: 500 }
    )
  }
}
