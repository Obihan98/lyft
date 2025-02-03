import {
  Card,
  InlineStack,
  ButtonGroup,
  Button,
  TextField,
  Text,
  BlockStack
} from "@shopify/polaris";

import { useState } from "react";

function Description({header, split, setSplit, errors, setErrors}) {

  return (
    <Card>
      <BlockStack gap={500}>
        <Text as="p" fontWeight="medium">
          {header}
        </Text>
        <TextField
          label="Title"
          value={split.title}
          onChange={(value) => {setErrors({...errors, title:""}); shopify.saveBar.show('split-save-bar'); setSplit({...split, title: value})}}
          showCharacterCount
          error={errors.title}
        />
      </BlockStack>
    </Card>
  );
}

export default Description;