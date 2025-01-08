export const generateChatResponse = async (messages: { role: 'user' | 'assistant' | 'system', content: string }[]) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
}; 