'use client'
import Image from "next/image";
import { useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function Home() {
  const apiKey = process.env.GEMINI_API_KEY; 
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Hi, I\'m the HeadStarter AI support Agent. How can I assist you today?',
  }]);

  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    const response = await fetch('https://generativelanguage.googleapis.com', { 
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemini-1.0-pro', // Update with the specific model name for Gemini
        messages: [
          ...messages,
          { role: 'user', content: message }
        ],
        stream: true, // Ensure streaming is supported
      }),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = '';
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }

        const text = decoder.decode(value || new Int8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);

          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  return (
    <Box
      width='100vw'
      height='100vh'
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      bgcolor={'#0f0f0f'}
    >
      <Stack
        width={'1000px'}
        height={'700px'}
        border={'1px solid white'}
        direction={'column'}
        spacing={2}
        p={2}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          maxHeight={'100%'}
          overflow={'auto'}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display={'flex'}
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={message.role !== 'assistant' ? '#D3D3D3' : '#f0f0f0'}
                color={'black'}
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label={'Message'}
            variant="filled"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'white',
              },
              '& .MuiInputBase-root.Mui-focused': {
                backgroundColor: 'white',
              },
              '& .MuiInputBase-input': {
                color: 'black',
              },
              '& .MuiInputBase-root:hover': {
                backgroundColor: 'white',
              },
            }}
          />
          <Button variant="contained" color="success" onClick={sendMessage} endIcon={<SendIcon />}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
