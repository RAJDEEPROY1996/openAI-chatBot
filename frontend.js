import React, { useState, useEffect } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
	setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
	event.preventDefault();
	if (inputValue.trim() !== '') {
  	sendMessage(inputValue);
  	setInputValue('');
	}
  };

  const sendMessage = (message) => {
	// Make API call to your backend server
	// Include logic to interact with OpenAI API and receive the response
	// Append the user message and OpenAI's response to the messages state
	setMessages((prevMessages) => [
  	...prevMessages,
  	{ text: message, sender: 'user' },
	]);
  };

  useEffect(() => {
	// Scroll to the bottom of the chat window when new messages are added
	const chatWindow = document.getElementById('chat-window');
	chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  return (
	<div className="chat-app">
  	<div id="chat-window" className="chat-window">
    	{messages.map((message, index) => (
      	<div
        	key={index}
        	className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
      	>
        	<span className="sender">{message.sender}</span>
        	<p className="text">{message.text}</p>
      	</div>
    	))}
  	</div>
  	<form className="message-input" onSubmit={handleSubmit}>
    	<input
      	type="text"
      	placeholder="Type your message..."
      	value={inputValue}
      	onChange={handleInputChange}
    	/>
    	<button type="submit">Send</button>
  	</form>
	</div>
  );
};

export default ChatApp;