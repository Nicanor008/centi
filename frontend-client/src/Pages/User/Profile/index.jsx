import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  // const navigate = useNavigate();
  const { user } = JSON.parse(localStorage.getItem("user"));

  return (
    <Flex align="center" justify="center" h="100%">
      <Stack
        spacing={4}
        w="full"
        maxW="md"
        rounded="xl"
        boxShadow="lg"
        p={6}
        my={12}
        h="100%"
        bg="white"
      >
        {/* <Heading fontFamily="inherit">Profile</Heading> */}
        {/* <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6} alignItems="center">
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Button w="full" bg="gray.200">
              Change Icon
            </Button>
          </Stack>
        </FormControl> */}
        {/* <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl> */}
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.900" }}
            type="email"
            value={user?.email}
            disabled
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Member since</FormLabel>
          <Input
            _placeholder={{ color: "gray.900" }}
            value={new Date(user?.createdAt).toDateString()}
            disabled
          />
        </FormControl>
        {/* <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: "gray.500" }}
            type="password"
          />
        </FormControl> */}
        {/* <Stack spacing={6} direction={["column", "row"]}>
          <Button variant="secondary" w="full" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button w="full">Edit</Button>
        </Stack>
        <Stack spacing={6} direction={["column", "row"]} mt={4}>
          <Button variant="secondary">Deactivate Account</Button>
          <Button variant="ghost">Delete Account</Button>
        </Stack> */}
      </Stack>
    </Flex>
  );
}
