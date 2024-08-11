'use client'
import Image from "next/image";
import { useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Assistant } from "next/font/google";
import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


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
          overflow={'auto'}>
        {messages.map((message,index) =>(
          <Box
          key={'index'}
          display={'flex'}
          justifyContent={
            message.role === 'assistant'? 'flex-start':'flex-end'
          }>
            <Box
            bgcolor={message.role != 'assistant'? '#D3D3D3': '#f0f0f0'}
            color={'black'}
            borderRadius={16}
            p={3}>
              {message.content}
            </Box>
          </Box>
          ))}
          </Stack>
          <Stack direction={'row'} spacing={2} >
            <TextField 
            label={'Message'}
            variant="filled"
            fullWidth
            value={'Message'}
            onChange={(e)=> setMessage(e.target.value)
            }
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
            <Button variant="contained" color="success" endIcon={<SendIcon />}>
              Send
            </Button>
          </Stack>
        </Stack>
        </Box>
}
