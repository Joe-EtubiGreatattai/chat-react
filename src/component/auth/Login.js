import React, { useState } from "react";
import {
  Button,
  Input,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const auth = getAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      onClose();
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to the ChatRoom upon successful login
      navigate("/Chat/ChatRoom");
    } catch (error) {
      const errorMsg = error.message || "An error occurred during login.";
      toast({
        title: "Login Failed",
        description: errorMsg,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <>   
      <Button onClick={onOpen} leftIcon={<FaSignInAlt />}>
        Login
      </Button>
     
      </>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading as="h2" size="md" mb={4}>
              Login
            </Heading>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb={2}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={handleLogin}
              isLoading={isLoading}
            >
              Login
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
