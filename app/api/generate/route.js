import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// System prompt that instructs the AI on how to generate flashcards
const systemPrompt = `
You are a flashcard creator. You take in text and create exactly 10 flashcards from it.
Both the front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards": [
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

// POST: Generate flashcards using OpenAI
export async function POST(req) {
  const openai = new OpenAI(process.env.OPENAI_API_KEY) // Ensure your OpenAI API key is set in env

  try {
    // Retrieve the text data sent in the request
    const data = await req.text()

    // Create a completion request to OpenAI's API with the given system prompt and user data
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-4', // Adjust the model if necessary
      max_tokens: 1000, // Ensure sufficient tokens for the response
      temperature: 0.7, // Adjust for randomness; lower values are more deterministic
    })

    // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  } catch (error) {
    console.error('Error generating flashcards:', error)
    return new NextResponse(
      JSON.stringify({ error: { message: error.message } }),
      { status: 500 }
    )
  }
}
