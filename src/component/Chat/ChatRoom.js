import React, { useState, useEffect, useRef } from "react";
import { Box, Input, IconButton, VStack, Text, Flex } from "@chakra-ui/react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "../../firebase/firebase";
import { FaPaperPlane } from "react-icons/fa"; // Import the send icon
import "./style.css";
import Logout from "../auth/Logout";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const firestore = getFirestore();

  const fetchMessages = () => {
    const messagesRef = collection(firestore, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(newMessages);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchMessages();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Scroll to the last message when new messages come in
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const user = auth.currentUser;

    if (user) {
      const messagesRef = collection(firestore, "messages");

      await addDoc(messagesRef, {
        text: newMessage,
        timestamp: serverTimestamp(),
        userId: user.uid,
        userName: user.displayName,
      });

      setNewMessage("");
    }
  };
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on the input field when the component mounts
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent new line in the input field
      sendMessage();
    }
  };

  return (
    <VStack
      spacing={4}
      p={4}
      borderRadius="md"
      maxHeight="90vh"
      overflowY="auto"
      width="100vw"
      position="fixed"
      left={0}
      top={0}
    >
      <Logout />

      {messages.map((message) => (
        <Box
          key={message.timestamp?.toMillis()}
          bg={message.userId === auth.currentUser?.uid ? "teal.800" : "gray"}
          textAlign={
            message.userId === auth.currentUser?.uid ? "right" : "left"
          }
          p={2}
          borderRadius="md"
          width="fit-content"
          alignSelf={
            message.userId === auth.currentUser?.uid ? "flex-end" : "flex-start"
          }
        >
          <Flex color="#eee" gap={2}>
            {message.userId !== auth.currentUser?.uid && (
              <Text fontWeight="bold">{message.userName}:</Text>
            )}
            <Text
              textAlign={
                message.userId === auth.currentUser?.uid ? "left" : "right"
              }
            >
              {message.text}
            </Text>
          </Flex>
          <Text
            fontSize="xs"
            color="#eee"
            textAlign={
              message.userId === auth.currentUser?.uid ? "right" : "left"
            }
          >
            {message.timestamp
              ? new Date(message.timestamp.toMillis()).toLocaleTimeString()
              : ""}
          </Text>
        </Box>
      ))}

      <div ref={messagesEndRef} />

      <Box
        borderRadius="md"
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
        display="flex"
        alignItems="center"
        p={1}
        backgroundColor="white"
        boxShadow="0px -5px 5px rgba(0, 0, 0, 0.1)"
      >
        <Input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          flex="1"
          onKeyDown={handleKeyDown}
          ref={inputRef}  // Reference for focusing
        />
        <IconButton
          colorScheme="teal"
          icon={<FaPaperPlane />}
          onClick={sendMessage}
          ml={2}
          background="teal.800"
        />
      </Box>
    </VStack>
  );
};

export default ChatRoom;
