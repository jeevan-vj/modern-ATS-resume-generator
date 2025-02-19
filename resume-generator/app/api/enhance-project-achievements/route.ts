import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const { currentAchievements, projectName, projectRole, techStack } = await req.json()

  const prompt = `Enhance the following project achievements to be more impactful and ATS-friendly.
Project Name: ${projectName}
Role: ${projectRole}
Tech Stack: ${techStack.join(', ')}
Current Achievements: ${currentAchievements}

Please improve these achievements by creating a bulleted list in HTML format (<ul><li>) with 3-4 key points that:
1. Use quantifiable metrics and results
2. Highlight business impact with specific numbers
3. Include specific technical accomplishments
4. Start each point with a strong action verb
5. Are concise and professional

Format the response as valid HTML with <ul> and <li> tags.`

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer that helps enhance project achievements to be more impactful and ATS-friendly. Always format responses as HTML bullet points using <ul> and <li> tags."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    })

    const suggestion = response.choices[0].message.content || ''
    // Ensure the response is wrapped in a list if it isn't already
    const formattedSuggestion = suggestion.includes('<ul>') ? 
      suggestion : 
      `<ul>${suggestion.split('\n').filter(line => line.trim()).map(line => `<li>${line}</li>`).join('')}</ul>`

    return NextResponse.json({ suggestions: [formattedSuggestion] })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to enhance achievements' }, { status: 500 })
  }
}