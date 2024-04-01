import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DataNotFound from "../../../../../../components/ErrorPages/DataNotFound";

const DataNotFoundWithChildren = ({
  budget,
  budgetItems,
  budgetId,
  deleteBudget,
}) => {
  const navigate = useNavigate();

  return (budgetItems?.data?.length < 1 &&
    (budgetItems?.filtered || budgetItems?.search)) ||
    budgetItems?.data?.length < 1 ? (
    <Flex
      alignItems="center"
      justifyContent="center"
      h="65vh"
      flexDir="column"
      gap={4}
    >
      <DataNotFound>
        <Flex gap={3} mt={4}>
          <Button
            bg="green.400"
            color="white"
            onClick={() =>
              navigate("/budget/add/2", {
                state: { budget: { ...budgetItems, _id: budgetId } },
              })
            }
            _hover={{
              bg: "green.400",
            }}
          >
            Add Expense
          </Button>
          <Button
            bg="red.400"
            color="white"
            onClick={() => deleteBudget(budget)}
            _hover={{
              bg: "red.400",
            }}
          >
            Delete Budget
          </Button>
        </Flex>
      </DataNotFound>
    </Flex>
  ) : (
    <></>
  );
};

export default DataNotFoundWithChildren;
