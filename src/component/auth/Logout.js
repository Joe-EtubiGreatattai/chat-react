import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

const Logout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await auth.signOut();

      onClose(); // Close the modal on successful logout
      toast({
        title: 'Logout Successful',
        description: 'You have successfully logged out.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/'); // Redirect to the home screen
    } catch (error) {
      toast({
        title: 'Logout Failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box position="fixed" top="1rem" right="1rem">
        <IconButton
          icon={<FaSignOutAlt />}
          onClick={onOpen}
          aria-label="Logout"
          background="teal.800"
          color="#fff"
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to logout?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleLogout} isLoading={isLoading}>
              Logout
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Logout;
