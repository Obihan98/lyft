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

function Description({header, discount, setDiscount, errors, setErrors}) {

  return (
    <Card>
      <BlockStack gap={200}>
        <Text as="p" fontWeight="medium">
          {header}
        </Text>
        <TextField
          label="Title"
          value={discount.title}
          onChange={(value) => {setErrors({...errors, title:""}); shopify.saveBar.show('discount-save-bar'); setDiscount({...discount, title: value})}}
          showCharacterCount
          error={errors.title}
        />
      </BlockStack>
    </Card>
  );
}

export default Description;