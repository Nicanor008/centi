import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { config } from "../../../config";

export default function Login() {
  const { state } = useLocation();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: state?.success ? state.data?.email : "",
    },
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // check user
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      return navigate("/budget/dashboard", { replace: true });
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${config.API_URL}/auth/login`, data);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/budget/dashboard");
    } catch (error) {
      console.error("Error:", error); // Handle error
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} fontFamily="inherit">
            Sign in to your account
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool️ features
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="john.doe@example.com"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={2} mt={2}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link href="/forgot-password" color={"blue.400"}>
                    Forgot password?
                  </Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"red.400"}
                  color={"white"}
                  _hover={{
                    bg: "red.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
            <Link href="/signup" color={"blue.400"} mt={1}>
              Create an account
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
