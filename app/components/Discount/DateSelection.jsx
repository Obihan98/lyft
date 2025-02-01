import DateTimePicker from "./DateTimePicker.jsx";

import {
  Card,
  InlineStack,
  ButtonGroup,
  Button,
  Checkbox,
  Text,
  BlockStack
} from "@shopify/polaris";

import { useState } from "react";

function DateSelection({discount, setDiscount, errors, setErrors}) {
  return (
		<Card>
		<BlockStack gap="200">
			<Text as="p" fontWeight="medium">
				Active dates
			</Text>
			<DateTimePicker initialValue={discount.starts_at}
				dateLabel={"Start date"}
				timeLabel={"Start time"}
				onChange = {(value) => {
					setDiscount({...discount, starts_at: value})
				}}
			/>
			<Checkbox
				label="Set end date"
				checked={discount.endDateIsSet}
				onChange={(newChecked) => {
					setDiscount({...discount, endDateIsSet: newChecked})
				}}
			/>
			{discount.endDateIsSet
				? 
					<DateTimePicker initialValue={discount.ends_at}
						dateLabel={"End date"}
						timeLabel={"End time"}
						onChange = {(value) => {
							setDiscount({...discount, ends_at: value})
						}}
					/> 
				: null}
			{/* {(discount.endDateIsSet === true) && ((new Date(discount.starts_at)).getTime() > new Date(discount.ends_at).getTime())
				? <InlineError message="End date must be after the start date." fieldID="myFieldID" />
				: null} */}
		</BlockStack>
	</Card>
  );
}

export default DateSelection;