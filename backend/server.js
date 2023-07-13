const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
//require('dotenv').config();
require('../node_modules/dotenv').config({ path: '../.env' });
const { OPEN_API } = process.env;
const OPENAI_API_KEY = OPEN_API;

// Handle POST request to /chat endpoint
app.post('/chat', async (req, res) => {
  try {
	const  message  = req.body;
    console.log("message from frontend -> ",message.name);
    //res.json({status:"send data from server",boolCode:true})

	//Make API call to OpenAI
	const response = await axios.post(
  	'https://api.openai.com/v1/chat/completions',
  	{
        model:"gpt-3.5-turbo",
    	messages: [
      	{ role: 'system', content: 'You are a helpful assistant.' },
      	{ role: 'user', content: message.name },
    	],
  	},
  	{
    	headers: {
      	Authorization: `Bearer ${OPENAI_API_KEY}`,
      	'Content-Type': 'application/json',
    	},
  	}
	);

	// Extract the generated message from the OpenAI response
	const generatedMessage =
  	response.data.choices[0].message.content.trim();

	//Send the generated message as the response
	res.json({ message: generatedMessage });
  } catch (error) {
	console.error('Error:', error.message);
	res.status(500).json({ error: 'An error occurred' });
  }
});
// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});