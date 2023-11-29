import { Ollama } from 'langchain/llms/ollama'

type Models =
  | 'codellama:7b-instruct'
  | 'codellama:latest'
  | 'llama2:latest'
  | 'mistral:latest'

const ollama = new Ollama({
  baseUrl: 'http://localhost:11434',
  model: 'codellama:7b-instruct' as Models
})

export const askOllama = async (question: string): Promise<string> => {
  const answer = await ollama.call(question)
  return answer
}
