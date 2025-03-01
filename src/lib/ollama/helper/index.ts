import { ChatOllama } from "@langchain/ollama"


export enum Model {
  CODELLAMA_7B_INSTRUCT = 'codellama:7b-instruct',
  CODELLAMA_LATEST = 'codellama:latest',
  LLARMA2_LATEST = 'llama2:latest',
  MISTRAL_LATEST = 'mistral:latest',
  DEEPSEEK_CODER = 'deepseek-coder:6.7b',
  DOLPHIN2_2_MISTRAL = 'dolphin2.2-mistral:latest',
  MEDLLAMA2 = 'medllama2:latest',
  LLAMA_3B_3_2 = 'llama3.2:latest',
}

const ollama = new ChatOllama({
  model: Model.LLAMA_3B_3_2
})

export const askOllama = async (
  question: string,
  model?: Model
): Promise<string> => {
  if (model) {
    ollama.model = model
  }
  const answer = await ollama.invoke(question)
  return answer.content.toString()
}
