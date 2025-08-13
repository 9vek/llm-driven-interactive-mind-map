import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { topic } from '../sampleLearningMaterial';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { nodeName } = await req.json();
  const result = streamText({
    model: openai('gpt-4o'),
    prompt: `
    You are a learning coach creating concise, ADHD-friendly explanations for one mind map node.

    Node Name: ${nodeName}
    Learning Material: ${topic}

    Task:
    - Faithfully extract only the knowledge relevant to this node.
    - Write in short, simple sentences. Prefer concrete examples or mini analogies.
    - Keep it focused and scannable, around 5–9 short lines.

    Structure in markdown (no outer code block):
    - One-sentence purpose of the node
    - Key idea 1 (one line)
    - Key idea 2 (one line)
    - Tiny example (one or two lines)
    - Common mistake or tip (one line)
    - Why it matters next (one line)

    Rules:
    - Do not quote the material verbatim.
    - No headings, tables, or code blocks; use plain markdown lines only.
    `,
  });
  
  return result.toTextStreamResponse();
}
 

