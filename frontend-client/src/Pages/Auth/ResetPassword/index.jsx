import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../config";

export default function ResetPassword() {
  const { email, otp } = useParams()
  const navigate = useNavigate()

  const { handleSubmit, register } = useForm({
    defaultValues: {
      email,
      otp,
      newPassword: ""
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setError("")
    setIsSubmitting(true)
    try {
      const response = await axios.post(`${config.API_URL}/auth/reset-password`, data);
      setIsSubmitting(false)
      localStorage.setItem("user", JSON.stringify(response.data.data));
      navigate(`/reset-password/${data.email}/${response?.otp}`)
    } catch (error) {
      setIsSubmitting(false)
      setError(error?.response?.data?.error.message)
    }
  }

  return (
    <Flex align={"center"} justify={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
            <Text color="red.500" textAlign="center">{error}</Text>
          <Heading lineHeight={1.1} fontSize={{ base: "xl", md: "2xl" }} fontFamily="inherit">
            Reset Password
          </Heading>
          <FormControl id="otp" isRequired>
            <FormLabel>OTP Code</FormLabel>
            <Input
              {...register("otp")}
              type="number"
              placeholder="123445"
              disabled={otp?.length === 6}
            />
          </FormControl>
          <FormControl id="newPassword" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                {...register("newPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="*****************"
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
          <Stack spacing={6}>
            <Button
              type="submit"
              bg={"red.400"}
              color={"white"}
              _hover={{
                bg: "red.500",
              }}
              isLoading={isSubmitting}
              loadingText='Submitting'
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Flex>
  );
}
