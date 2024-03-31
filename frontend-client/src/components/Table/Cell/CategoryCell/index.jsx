import { Tag, Td } from "@chakra-ui/react";

const CategoryCell = ({ categories }) => (
  <Td
    minW={categories?.length > 0 ? "200px" : "auto"}
    h={categories?.length > 0 ? "80px" : "auto"}
    display="flex"
    flexWrap="wrap"
    overflow="scroll"
    alignItems="center"
    bg="inherit"
  >
    {categories?.map((category, idx) => (
      <Tag
        mr={1}
        mb={categories?.length > 2 ? 1 : 0}
        key={(category?._id || category?.value) + idx}
      >
        {category?.__isNew__ ? category?.label : category.name}
      </Tag>
    ))}
  </Td>
);

export default CategoryCell;
