'use client';

import { TextField, Button, Box, Stack, Typography, Avatar, CircularProgress, IconButton } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Analytics } from "@vercel/analytics/react" 

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm Aria. What can I assist you with today?",
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), // Initial timestamp for the assistant's message
    },
  ]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track the current theme
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() === '') return;
    setLoading(true);
    setTyping(true);

    const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const userMessage = {
      role: 'user',
      content: message,
      timestamp, // Include timestamp in the user message
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      { role: 'assistant', content: '', timestamp: null },
    ]);

    setMessage('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([...messages, userMessage]),
    });

    const result = await response.json();

    setLoading(false);
    setTyping(false);

    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      return [
        ...prevMessages.slice(0, prevMessages.length - 1),
        {
          ...lastMessage,
          content: result.result || 'No response',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      ];
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    backgroundColor: isDarkMode ? '#1a1a2e' : '#E6F7F8',
    color: isDarkMode ? '#FFFFFF' : '#394648',
    chatBoxBg: isDarkMode ? '#162447' : '#FFFFFF',
    assistantBg: isDarkMode ? '#3f51b5' : '#A3D8C9',
    userBg: isDarkMode ? '#9c27b0' : '#FFC1E3',
    scrollThumb: isDarkMode ? '#3f51b5' : '#94C7CC',
    scrollTrack: isDarkMode ? '#1a1a2e' : '#E6F7F8',
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor={theme.backgroundColor}
      color={theme.color}
      p={2}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" p={2}>
        <Typography variant="h3" sx={{ color: theme.color, margin: '0 auto' }}>
          AriaCare
        </Typography>
        <IconButton onClick={handleThemeChange} color="inherit" sx={{ fontSize: '2rem', marginRight: '16px' }}>
          {isDarkMode ? <Brightness7Icon fontSize="inherit" /> : <Brightness4Icon fontSize="inherit" />}
        </IconButton>
      </Box>
      <Stack
        direction="column"
        width={{ xs: '100%', sm: '90%', md: '80%' }} // Adjust width for different screen sizes
        maxWidth="800px"
        height="80%"
        borderRadius={4}
        p={3}
        spacing={3}
        bgcolor={theme.chatBoxBg}
        boxShadow="0px 4px 15px rgba(0, 0, 0, 0.1)"
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          p={2}
          sx={{
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.scrollThumb} ${theme.scrollTrack}`,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.scrollTrack,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.scrollThumb,
              borderRadius: '4px',
            },
          }}
        >
          {messages.map((messageObj, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection={messageObj.role === 'assistant' ? 'row' : 'row-reverse'}
              alignItems="flex-start"
              mb={2} // Increased margin between messages
            >
              <Box display="flex" flexDirection="column" alignItems="center" ml={messageObj.role === 'assistant' ? 0 : 2} mr={messageObj.role === 'assistant' ? 2 : 0}>
                <Avatar sx={{ bgcolor: messageObj.role === 'assistant' ? theme.assistantBg : theme.userBg, mb: 1 }}>
                  <img src={messageObj.role === 'assistant' ? "/pic.png" : "/customer.png"} alt={messageObj.role === 'assistant' ? "Assistant" : "You"} style={{ width: '100%', height: '100%' }} />
                </Avatar>
                <Typography variant="subtitle2" sx={{ color: theme.color }}>
                  {messageObj.role === 'assistant' ? "Aria" : "You"}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: messageObj.role === 'assistant' ? theme.assistantBg : theme.userBg,
                  color: theme.color,
                  borderRadius: "18px",
                  p: 2, // Added padding to make messages less cramped
                  maxWidth: "70%",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  animation: "fadeIn 0.3s ease-in-out"
                }}
              >
                <Typography variant="body1">
                  {messageObj.content}
                </Typography>
                {messageObj.timestamp && (
                  <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: messageObj.role === 'assistant' ? 'left' : 'right' }}>
                    {messageObj.timestamp}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
          {typing && (
            <Box display="flex" alignItems="center" mt={2}>
              <Avatar sx={{ bgcolor: theme.assistantBg, mr: 1 }}>
                <img src="/pic.png" alt="Assistant" style={{ width: '100%', height: '100%' }} />
              </Avatar>
              <Typography variant="subtitle2" sx={{ color: theme.color, mr: 2 }}>
                Aria
              </Typography>
              <Typography variant="body2" sx={{ color: theme.color }}>
                Aria is typing...
              </Typography>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            placeholder="Type your message and press Enter..."
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="outlined"
            sx={{
              input: { color: theme.color },
              bgcolor: theme.scrollTrack,
              borderRadius: '4px',
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            disabled={loading}
            sx={{
              minWidth: '100px',
              bgcolor: theme.scrollThumb,
              opacity: 1, // Enhanced visibility
              '&:hover': {
                bgcolor: isDarkMode ? '#2c387e' : '#82B5B8',
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Send"}
          </Button>
        </Stack>
      </Stack>
      <Analytics />
    </Box>
  );
}
