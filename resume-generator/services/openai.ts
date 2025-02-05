import OpenAI from 'openai';
import { mockParseResume } from './mockOpenAI';

const USE_MOCK = process.env.USE_MOCK === 'true';

if (!process.env.OPENAI_API_KEY && !USE_MOCK) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = USE_MOCK ? null : new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function parseResume(content: string) {
  console.log('🔄 Starting resume parsing process');
  console.log(`🔍 Using ${USE_MOCK ? 'MOCK' : 'REAL'} OpenAI service`);

  if (USE_MOCK) {
    console.log('🎭 Using mock OpenAI service');
    return mockParseResume(content);
  }

  try {
    console.log('📏 Content length:', content.length, 'characters');
    console.log('🚀 Sending request to OpenAI API (GPT-4)');
    console.time('openai-request');

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using GPT-4 for better parsing and larger context window
      messages: [
        {
          role: "system",
          content: "You are a professional resume parser that extracts structured information from resumes. Always return valid JSON format."
        },
        {
          role: "user",
          content: `Extract the following information from this resume in JSON format:
            - personal_info (name, email, phone, location)
            - work_experience (array of positions with company, title, duration, responsibilities)
            - education (array of degrees with institution, degree, year)
            - skills (technical_skills, soft_skills)
            
            Resume content:
            ${content}`
        }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    });

    console.timeEnd('openai-request');
    console.log('✅ Received OpenAI response:', {
      model: response.model,
      promptTokens: response.usage?.prompt_tokens,
      completionTokens: response.usage?.completion_tokens,
      totalTokens: response.usage?.total_tokens
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('❌ OpenAI API error:', error);
    console.error('OpenAI error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    throw error;
  }
}
