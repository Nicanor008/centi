import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config";

export default function SignupOTP() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const userSignupToken = JSON.parse(localStorage.getItem("user-signup-897123"))
  
  // check user
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      return navigate("/dashboard", { replace: true });
    }
  }, []);

  const onSubmit = async (data) => {
    setError("")
    setIsSubmitting(true)

    if(data.otp.length < 6) {
      setError("OTP Code is required and must be contain 6 numbers")
      setIsSubmitting(false)
      return;
    }

    let payloadConfig = {
      method: "post",
      url: `${config.API_URL}/auth/verify-otp`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userSignupToken}`,
      },
      data: { otp: data.otp, user: userSignupToken?.user},
    };

    try {
      const response = await axios.request(payloadConfig);

      setIsSubmitting(false)
      localStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/dashboard", { state: response.data });
    } catch (error) {
      setIsSubmitting(false)
      setError(error?.response?.data?.error.message)
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"} textAlign={"center"} fontFamily="inherit">
            Verify Account
          </Heading>
          <Text fontSize={"md"} color={"gray.600"}>
            to proceed, confirm your account by entering the OTP sent to your email
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Text color="red.500" textAlign="center">{error}</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <Box>
                  <FormControl id="otp" isRequired>
                    <FormLabel>OTP Code</FormLabel>
                    <Input
                      {...register("otp")}
                      type="number"
                      placeholder="123445"
                    />
                  </FormControl>
                </Box>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Verifying"
                  isLoading={isSubmitting}
                  // disabled={}
                >
                  Continue
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
