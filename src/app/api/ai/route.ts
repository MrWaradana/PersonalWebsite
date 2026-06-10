import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages, temperature = 0.15 } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required and must be an array.' }, { status: 400 })
    }

    const apiServer = process.env.LLAMA_CPP_BASE_URL_GEMMA_26B || 'https://gemma.digitaltwin.my.id/v1'
    const endpoint = `${apiServer}/chat/completions`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-no-key-required'
      },
      body: JSON.stringify({
        model: 'gemma4-26b-llamacpp',
        messages: messages,
        temperature: temperature,
        max_tokens: 1500,
        extra_body: {
          thinking: false
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Model server error:', errorText)
      return NextResponse.json({ error: `Model server returned status ${response.status}` }, { status: 500 })
    }

    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content || ''

    return NextResponse.json({ text: content })
  } catch (error: any) {
    console.error('API Error in AI assistant proxy:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
