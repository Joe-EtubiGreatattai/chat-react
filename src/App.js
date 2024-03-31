import React, { useState, useEffect } from 'react';
import { ChakraProvider, CSSReset, Flex, Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatRoom from './component/Chat/ChatRoom';
import SignUp from './component/auth/SignUp';
import Login from './component/auth/Login';
import Logout from './component/auth/Logout';
import { getAuth } from 'firebase/auth'; // Import getAuth from 'firebase/auth'

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(); // Correctly import getAuth
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => unsubscribe();
  }, []);

  return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <Flex
          minHeight="100vh"
          width="100vw"
          align="center"
          justify="center"
          direction="column"
          bg="#000"
        >
          <Container
            maxW="container.sm"
            align="center"
            justify="center"
            direction="column"
          >
            <Routes>
              <Route path="/" element={<AuthComponents user={user} />} />
              <Route path="/Chat/ChatRoom" element={<ChatRoom />} />
            </Routes>
          </Container>
        </Flex>
      </Router>
    </ChakraProvider>
  );
};

const AuthComponents = ({ user }) => {
  return (
    <Flex align="center" justify="center" direction="column" gap={5}>
      <SignUp />
      <Login />
      <Logout user={user} />
    </Flex>
  );
};

export default App;
