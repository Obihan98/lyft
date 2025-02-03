import {
	Card,
	TextField,
	Divider,
	ChoiceList,
	Text,
	BlockStack,
	InlineGrid
} from "@shopify/polaris";

import { useState } from "react";

function MaximumItems({header, split, setSplit, errors, setErrors, currency, shopWeightUnit}) {
  const renderSelectLimitValue = () => {
		if (split.limit == 'count') 
			return (
				<TextField
					label="Max items per group"
					type="number"
					align=""
					value={split.limitValue}
					onChange={(value) => {shopify.saveBar.show('split-save-bar'); setSplit((prevSplit) => ({ ...prevSplit, limitValue: value}))}}
					autoComplete="off"
					size="slim"
				/>
		);
		if (split.limit == 'value') 
			return (
				<TextField
					label="Max value per group"
					type="number"
					align=""
					prefix={currency}
					value={split.limitValue}
					onChange={(value) => {shopify.saveBar.show('split-save-bar'); setSplit((prevSplit) => ({ ...prevSplit, limitValue: value}))}}
					autoComplete="off"
					size="slim"
				/>
		);
		if (split.limit == 'weight') 
			return (
				<TextField
						label="Max weight per group"
						type="number"
						suffix={
								shopWeightUnit === "GRAMS" ? "g" :
								shopWeightUnit === "KILOGRAMS" ? "kg" :
								shopWeightUnit === "OUNCES" ? "oz" :
								shopWeightUnit === "POUNDS" ? "lb" :
								""
						}
						value={split.limitValue}
						onChange={(value) => {shopify.saveBar.show('split-save-bar'); setSplit((prevSplit) => ({ ...prevSplit, limitValue: value })); }}
						autoComplete="off"
						size="slim"
				/>
		);
	}

	return (
		<Card>
			<BlockStack gap={500}>
				<Text as="p" fontWeight="medium">
					Group size limits
				</Text>
				<ChoiceList
					title="Limit groups by"
					choices={[
						{label: 'No limit on group', value: 'none'},
						{label: 'Limit by item count', value: 'count'},
						{label: 'Limit by total value', value: 'value'},
						{label: 'Limit by total weight', value: 'weight'},,
					]}
					selected={split.limit}
					onChange={(value) => {shopify.saveBar.show('split-save-bar'); setSplit((prevSplit) => ({ ...prevSplit, limit: value[0]}))}}
				/>
			{
				split.limit !== 'none'
				?
					<>
						<Divider/>
						<InlineGrid gap="400" columns={2}>
							{renderSelectLimitValue()}
						</InlineGrid>
					</>
				:
					null
			}
			</BlockStack>
		</Card>
	);
}

export default MaximumItems;