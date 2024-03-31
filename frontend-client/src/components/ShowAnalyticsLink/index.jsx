import { Flex, Link } from "@chakra-ui/react";

const ShowAnalyticsLink = ({ count, title, link }) =>
  count > 0 && (
    <Flex py={1}>
      <Link href={link} fontSize={14} color="blue">
        {title}
      </Link>
    </Flex>
  );

export default ShowAnalyticsLink;
