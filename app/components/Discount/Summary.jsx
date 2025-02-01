import {
  Card,
  InlineStack,
  ButtonGroup,
  Button,
  List,
  Text,
  BlockStack
} from "@shopify/polaris";

import { useState } from "react";

function Summary({discount}) {

  return (
    <Card>
			<BlockStack gap={400}>
				<Text as="p" fontWeight="medium">
					{discount.title ? discount.title : "No title yet"}
				</Text>
				<BlockStack gap={200}>
					<Text as="p" fontWeight="medium">
						Type
					</Text>
					<Text as="p" fontWeight="regular">
						Amount off orders
					</Text>
				</BlockStack>
				<BlockStack gap={200}>
					<Text as="p" fontWeight="medium">
						Details
					</Text>
					<List type="bullet">
						{
							(discount.value) 
							?
								(discount.type === "percentage")
								?
									<List.Item>{discount.value}% off the order</List.Item>
								:
									<List.Item>${discount.value} off the order</List.Item>
							:
								null
						}
					</List>
				</BlockStack>
			</BlockStack>
		</Card>
  );
}

export default Summary;