import {
  Card,
  Icon,
  Autocomplete,
  Select,
  Tooltip,
  Text,
  BlockStack,
	Divider,
	RadioButton
} from "@shopify/polaris";

import { SearchIcon, InfoIcon } from '@shopify/polaris-icons';

import { useState, useEffect, useCallback } from "react";
import { useSubmit, useFetcher } from "@remix-run/react";


function TypeRule({split, setSplit, errors, setErrors, locations, autoCompleteSelected, setAutoCompleteSelected, autoCompleteInputValue, setAutoCompleteInputValue}) {
	const fetcher = useFetcher();

	const typeOptions = [
    {label: 'Vendor', value: 'vendor'},
    {label: 'SKU', value: 'sku'},
    {label: 'Type', value: 'type'},
		{label: 'Location', value: 'location'},
  ];

	const [ruleOptions, setRuleOptions] = useState((locations || []));	
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (fetcher.data?.groups) {
			setLoading(false);
			setRuleOptions(fetcher.data.groups);
			setAutoCompleteSelected([]);
			setAutoCompleteInputValue('');
		}
	}, [fetcher.data?.groups]);	
	
  const updateText = useCallback(
    (value) => {
      setAutoCompleteInputValue(value);

      if (!loading) {
        setLoading(true);
      }

      setTimeout(() => {
        if (value === '') {
					setRuleOptions(ruleOptions);
          setLoading(false);
          return;
        }
        const filterRegex = new RegExp(value, 'i');
        const resultOptions = ruleOptions.filter((option) =>
          option.label.match(filterRegex),
        );
        setRuleOptions(resultOptions);
        setLoading(false);
      }, 300);
    },
    [ruleOptions, loading],
  );

	const updateSelection = useCallback(
		(selected) => {
			const selectedValue = selected.map((selectedItem) => {
				const matchedOption = ruleOptions.find((option) => {
					return option.value.match(selectedItem);
				});
				return matchedOption ? matchedOption.label : null;
			});
	
			setAutoCompleteSelected(selected);
			shopify.saveBar.show('split-save-bar');
			setSplit((prevSplit) => ({ ...prevSplit, selectedGroup: selected[0] }))
			setAutoCompleteInputValue(selectedValue[0] || '');
		},
		[ruleOptions]
	);	

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      value={autoCompleteInputValue}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <Card>
      <BlockStack gap={500}>
				<Text as="p" fontWeight="medium">
          Split
        </Text>
				<BlockStack gap={100}>
					<Text as="p" fontWeight="regular">
						Group items by
					</Text>
					<Select
						options={typeOptions}
						onChange={(value) => {
							setRuleOptions([])
							setSplit({...split, groupBy: value});
							setAutoCompleteInputValue('');
							shopify.saveBar.show('split-save-bar');
							fetcher.submit(
								{ type: value, purpose: 'getGroups' },
								{ method: "post", encType: "application/json" }
							);
							setSplit({...split, selectedGroup: ''});
							setLoading(true);}}
						value={split.groupBy}
					/>
				</BlockStack>
        <Divider/>
				<BlockStack gap={100}>
				<Text as="p" fontWeight="regular">
					Split method
				</Text>
				<BlockStack gap={200}>
					<RadioButton
						label="Split all groups"
						helpText="Each group will be split into its own order."
						checked={split.all === true}
						onChange={() => {shopify.saveBar.show('split-save-bar'); setSplit({...split, all: true})}}
					/>
					<RadioButton
						label="Split specific group"
						helpText="Only the selected group will be split into its own order."
						checked={split.all === false}
						onChange={() => {setSplit({...split, all: false})}}
					/>
				</BlockStack>
				</BlockStack>

				{ split.all === false 
				?
					<>
						<Divider/>
						<BlockStack gap={100}>
							<Text as="p" fontWeight="regular">
								Group to split
							</Text>
							<Autocomplete
								options={ruleOptions}
								selected={autoCompleteSelected}
								onSelect={updateSelection}
								textField={textField}
								loading={loading}
								preferredPosition="below"
							/>
						</BlockStack>
					</>
				:
					null
				}
      </BlockStack>
    </Card>
  );
}

export default TypeRule;