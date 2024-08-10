'use client'
import Image from "next/image";
import { useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Assistant } from "next/font/google";


export default function Home() {
  const [messages, setMessages]= useState([{
    role: 'assistant',
    content: 'Hi Im the HeadStart AI support Agent. How can i assist you today? ',
  }])

  const [message, setMessage]= useState('')

  return <Box
        width='100vw'
        height='100vh'
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        bgcolor={'#0f0f0f'}>

        <Stack
        direction={'column'}
        spacing={2}
        flexGrow={1}
        maxHeight={'100%'}
        overflow={'auto'}
        >
        {messages.map((message,index) =>(
          <Box
          key={'index'}
          display={'flex'}
          justifyContent={
            message.role === 'assistent'? 'flex-start':'flex-end'
          }>
            <Box
            bgcolor={message.role != 'assistent'? '#D3D3D3': '#f0f0f0'}
            color={'white'}
            borderRadius={16}
            p={3}>
              
            </Box>
          </Box>
          ))}
        </Stack>
    
        </Box>
}
