import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { topic } from '../sampleLearningMaterial';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { nodeName } = await req.json();
  const result = streamText({
    model: openai('gpt-4o'),
    prompt: `
    Your task is to extract detailed relevant section from the full learning material based on the given one mind map node.

    The Node's Name: ${nodeName}
    Full Learning Content: ${topic}

    Requirements:
    - Faithfully extract only the knowledge relevant to this node.
    - Ensure that the extracted section is complete and self-contained.
    - Do not include any other sections or content in the original learning material that is not relevant to the node.
    - Do not add any additional information or commentary.
    `,
  });
  
  return result.toTextStreamResponse();
}
 

