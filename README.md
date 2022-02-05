# openai-repl

REPL for OpenAI platform to easily interact with the models.

## Setup

`npm install`

Create a `.env` file:

```
OPENAI_API_KEY=sk-API_KEY
```

## Usage

`node repl.js`

### Configuration

```
{
  engineId: 'text-davinci-001',
  temperature: 0.7,
  maxTokens: 100,
  topP: 1.0,
  frequencyPenalty: 0.0,
  presencePenalty: 0.0,
}
```

You can change any setting in the REPL by sending `key = value`:

```
$ node repl.js
> temperature = 0.2
temperature = 0.2
```

You can get any setting in the REPL by sending just the key:

```
$ node repl.js
> temperature
temperature = 0.7
```
