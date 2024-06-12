import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config";

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()

  const onSubmit = async (data) => {
    setError("")
    setIsSubmitting(true)
    try {
      const response = await axios.post(`${config.API_URL}/auth/forgot-password`, data);
      setIsSubmitting(false)
      navigate(`/reset-password/${data.email}/${response?.data?.data?.otp}`) // TODO: Remove OTP, this is insecure
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
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "xl", md: "2xl" }}
            fontFamily="inherit"
          >
            Forgot your password?
          </Heading>
          <Text fontSize={{ base: "sm", sm: "md" }}>
            You&apos;ll get an email with a reset code
          </Text>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              {...register("email")}
              type="email"
              placeholder="john.doe@example.com"
            />
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
              Request Reset Code
            </Button>
          </Stack>
        </Stack>
      </form>
    </Flex>
  );
}
