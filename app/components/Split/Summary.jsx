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

function Summary({split, currency, shopWeightUnit}) {
  const handleGetPlural = () => {
		if (split.groupBy == 'type') return "types";
		if (split.groupBy == 'location') return "locations";
		if (split.groupBy == 'vendor') return "vendors";
		if (split.groupBy == 'sku') return "SKUs";
	}

	const handleGetSingular = () => {
		if (split.groupBy == 'type') return "type";
		if (split.groupBy == 'location') return "location";
		if (split.groupBy == 'vendor') return "vendor";
		if (split.groupBy == 'sku') return "SKU";
	}

	const handleGetSizeLimit = () => {
    if (split.limit === 'none') return "Each split child order will have no size limit.";
    if (split.limit === 'count') return `Each split child order will contain up to ${split.limitValue} items.`;
    if (split.limit === 'value') return `Each split child order will have a maximum order value of ${currency}${split.limitValue}.`;
    if (split.limit === 'weight') return `Each split child order will weigh up to ${split.limitValue} ${shopWeightUnit.toLowerCase()}.`;
	}

  return (
    <Card>
			<BlockStack gap={400}>
				<Text as="p" fontWeight="medium">
					{split.title ? split.title : "No title yet"}
				</Text>
				<BlockStack gap={200}>
					<Text as="p" fontWeight="medium">
						Group by
					</Text>
					<Text as="p" fontWeight="regular">
						{`Items in the order will be grouped based on their ${handleGetPlural()}.`}
					</Text>
				</BlockStack>
				<BlockStack gap={200}>
					<Text as="p" fontWeight="medium">
						Group to split
					</Text>
					<Text as="p" fontWeight="regular">
						{
							split.all
							?
								"Each group will be split from the parent order into its own child order."
							:
								(split.selectedGroup.length > 0)
								?
									`Only the group with '${split.selectedGroup}' ${handleGetSingular()} will be split into its own order.`
								:
									"No group selected yet"
						}
					</Text>
				</BlockStack>
				<BlockStack gap={200}>
					<Text as="p" fontWeight="medium">
						Group size limit
					</Text>
					<Text as="p" fontWeight="regular">
						{handleGetSizeLimit()}
					</Text>
				</BlockStack>
			</BlockStack>
		</Card>
  );
}

export default Summary;