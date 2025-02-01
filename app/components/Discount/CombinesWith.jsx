import {
  Card,
  Checkbox,
  ButtonGroup,
  Button,
  TextField,
  Text,
  BlockStack
} from "@shopify/polaris";

import { useState } from "react";

function CombinesWith({discount, setDiscount, errors, setErrors}) {
  return (
    <Card>
			<BlockStack gap="200">
        <Text as="p" fontWeight="medium">
          Combinations
        </Text>
        <Text variant="bodyMd" as="p">
          This discount can be combined with:
        </Text>
				<BlockStack gap="50">
					<Checkbox
						label="Product discounts"
						checked={discount.combine_product}
						onChange={(newChecked) => {shopify.saveBar.show('discount-save-bar'); setDiscount({...discount, combine_product: newChecked})}}
					/>
					<Checkbox
						label="Order discounts"
						checked={discount.combine_order}
						onChange={(newChecked) => {shopify.saveBar.show('discount-save-bar'); setDiscount({...discount, combine_order: newChecked})}}
					/>
					<Checkbox
						label="Shipping discounts"
						checked={discount.combine_shipping}
						onChange={(newChecked) => {shopify.saveBar.show('discount-save-bar'); setDiscount({...discount, combine_shipping: newChecked})}}
					/>
				</BlockStack>
			</BlockStack>
    </Card>
  );
}

export default CombinesWith;