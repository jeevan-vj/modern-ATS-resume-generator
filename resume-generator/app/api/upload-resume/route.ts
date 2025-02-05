import { NextRequest, NextResponse } from 'next/server';
import { parseResume } from '@/services/openai';

export async function POST(req: NextRequest) {
  console.log('📥 Received text content for parsing');
  
  try {
    const { text } = await req.json();

    if (!text) {
      console.error('❌ No text content provided');
      return NextResponse.json(
        { error: 'No text content provided' },
        { status: 400 }
      );
    }

    console.log(`📄 Content length: ${text.length} characters`);
    console.log('📄 First 200 characters:', text.substring(0, 200));

    // Parse resume using OpenAI
    console.log('🤖 Sending to OpenAI for parsing...');
    const parsedContent = await parseResume(text);
    console.log('✅ Received response from OpenAI');
    
    // Parse the response into JSON
    const parsedData = JSON.parse(parsedContent || '{}');
    console.log('📊 Parsed resume data:', {
      sections: Object.keys(parsedData),
      personalInfoFields: Object.keys(parsedData.personal_info || {}),
      experienceCount: (parsedData.work_experience || []).length,
      educationCount: (parsedData.education || []).length,
      skillsCount: (parsedData.skills?.technical_skills || []).length + 
                  (parsedData.skills?.soft_skills || []).length
    });

    return NextResponse.json({
      success: true,
      data: parsedData,
    });

  } catch (error) {
    console.error('❌ Error processing text content:', error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return NextResponse.json(
      { error: 'Failed to process text content' },
      { status: 500 }
    );
  }
}
