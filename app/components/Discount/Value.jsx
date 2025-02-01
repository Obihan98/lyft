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

function Value({discount, setDiscount, errors, setErrors, currency}) {
  const handleSwitchDiscountType = (newType) => {
    setDiscount({...discount, type: newType});
  };

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="p" fontWeight="medium">
          Discount Value
        </Text>
        <InlineStack blockAlign="start" wrap={false} gap={300} align="start">
          <ButtonGroup variant="segmented">
            <Button
              size="large"
              pressed={discount.type === "fixed_amount"}
              onClick={() => {shopify.saveBar.show('discount-save-bar'); handleSwitchDiscountType("fixed_amount")}}
            >
              <span style={{ whiteSpace: "nowrap" }}>Fixed amount</span>
            </Button>
            <Button
              size="large"
              pressed={discount.type === "percentage"}
              onClick={() => {shopify.saveBar.show('discount-save-bar'); handleSwitchDiscountType("percentage")}}
            >
              <span style={{ whiteSpace: "nowrap" }}>Percentage</span>
            </Button>
          </ButtonGroup>
          <div style={{ flexGrow: "1" }}>
            <TextField
              type="number"
              inputMode="decimal"
              autoComplete="off"
              error={errors.value}
              selectTextOnFocus
              prefix={discount.type === "fixed_amount" ? currency : ""}
              suffix={discount.type === "percentage" ? "%" : ""}
              value={discount.value}
              onChange={(newValue) => {setErrors({...errors, value: ""}); shopify.saveBar.show('discount-save-bar'); setDiscount({...discount, value: newValue});}}
            />
          </div>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}

export default Value;