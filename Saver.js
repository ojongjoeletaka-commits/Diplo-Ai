

const express = require('express');
const OpenAI = require('openai');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: 'Please enter a question.'
      });
    }

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      instructions: 'You are Gblo AI, a helpful assistant. Solve maths problems step by step and answer general questions clearly, including definitions of science and other subjects.',
      input: message
    });

    res.json({ answer: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Sorry, Gblo AI could not answer right now. Please try again.'
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Gblo AI is running on port ${PORT}`);
});
