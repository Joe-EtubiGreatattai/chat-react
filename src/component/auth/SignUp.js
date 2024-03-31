import React, { useState } from 'react';
import { Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useToast } from '@chakra-ui/react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FaUserPlus } from 'react-icons/fa';
const SignUp = () => {
  const auth = getAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Added username state
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Update user profile with the provided username
      await updateProfile(user, { displayName: username });

      onClose();
      toast({
        title: 'Sign Up Successful',
        description: 'You have successfully signed up.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const errorMsg = error.message || 'An error occurred during signup.';
      toast({
        title: 'Sign Up Failed',
        description: errorMsg,
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <>
      <Button onClick={onOpen} leftIcon={<FaUserPlus  />}>
      Sign Up
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb={2}
            />
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              mb={2}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb={4}
            />
            {/* Add any additional user data input fields here */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSignUp} isLoading={isLoading}>
              Sign Up
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUp;
