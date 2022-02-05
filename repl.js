const repl = require('repl')
const { Configuration, OpenAIApi } = require('openai')

require('dotenv').config()

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}))

const config = {
  engineId: 'text-davinci-001',
  temperature: 0.7,
  maxTokens: 100,
  topP: 1.0,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
}
const configKeys = Object.keys(config)
const configSetterRegex = new RegExp(`^\\s*(${configKeys.join('|')})\\s*=\\s*(.*)\\s*$`)
const configGetterRegex = new RegExp(`^\\s*(${configKeys.join('|')})\\s*$`)

// Start REPL.
const r = repl.start({
  prompt: '> ',
  eval: async (prompt, context, filename, callback) => {
    if (typeof prompt === 'string') prompt = prompt.trim()
    if (!prompt) return callback()

    // Set config.
    let match = prompt.match(configSetterRegex)
    if (match) {
      const [, key, value] = match

      // Format as correct type based on existing config.
      const existingValue = config[key]
      let typedValue = value
      if (typeof existingValue === 'number') typedValue = Number(value)

      // Save config.
      config[key] = typedValue
      console.log(`${key} = ${typedValue}`)
      return callback()
    }
    // Get config.
    match = prompt.match(configGetterRegex)
    if (match) {
      const [, key] = match
      console.log(`${key} = ${config[key]}`)
      return callback()
    }

    const { engineId, temperature, maxTokens, topP, frequencyPenalty, presencePenalty } = config

    // Get OpenAI response.
    const response = await openai.createCompletion(engineId, {
      prompt,
      temperature,
      max_tokens: maxTokens,
      top_p: topP,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
    })
    console.log(response.data.choices.map(({ text }) => text).join('\n').trim())
    callback()
  },
})

r.on('exit', () => {
  console.log('Exiting...')
  // Tell node script to exit once repl exits.
  process.exit()
})
