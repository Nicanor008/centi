import { Box, List, ListItem, Text } from "@chakra-ui/react";

const parseBudgetData = (data) => {
  const lines = data.split('\n').filter(line => line.trim() !== '');
  const title = lines.shift();
  const sections = [];
  let currentSection = {};

  lines.forEach(line => {
    if (/^\d+\.\s/.test(line)) {
      if (currentSection.title) {
        sections?.push(currentSection);
      }
      currentSection = { title: line, items: [] };
    } else if (line.startsWith('- ')) {
      currentSection?.items?.push(line);
    }
  });

  if (currentSection.title) {
    sections?.push(currentSection);
  }

  return { title, sections };
};

const FormatAIGeneratedBudgetItem = ({ data }) => {
  const { title, sections } = parseBudgetData(data);

  return (
    <Box px={5}>
      <Text fontSize="lg" mb={4}>{title}</Text>
      {sections.map((section, index) => (
        <Box key={index} mb={4}>
          <Text fontSize="md">{section.title}</Text>
          <List spacing={2} pl={4}>
            {section.items.map((item, itemIndex) => (
              <ListItem key={itemIndex}>{item}</ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default FormatAIGeneratedBudgetItem
