import PressedButtonFixedPercentage from "./PressedButtonFixedPercentage.jsx";

import {
  Card,
  InlineStack,
  ChoiceList,
  Button,
  TextField,
  Text,
  BlockStack,
	Box,
	Icon,
	Bleed,
	ResourceList,
	Thumbnail,
	Divider
} from "@shopify/polaris";

import { SearchIcon, XIcon } from "@shopify/polaris-icons";

import { useState } from "react";

function SelectProduct({discount, setDiscount, errors, setErrors, currency}) {
	const [hoveredRow, setHoveredRow] = useState(null);

	// ResourcePicker to select products
	async function selectProduct() {
		const products = await window.shopify.resourcePicker({
			type: "product",
			action: "add",
			multiple: "multiple",
			selectionIds: (discount.selected_products.length > 0
					? discount.selected_products.map(product => ({
							id: product.id,
							variants: product.variants.map(variant => ({id: variant.id}))
					}))
					: [])
		});

		if (products) {
			setDiscount({...discount, selected_products: products});
		}
	}

	//ResourcePicker to select collections
	async function selectCollection() {
		const collections = await window.shopify.resourcePicker({
			type: "collection",
			action: "add",
			multiple: "multiple",
		});

		if (collections) {
			setDiscount({...discount, selected_collections: collections});
		}
	}

  return (
    <Card>
      <BlockStack gap="400">
        <BlockStack gap="200">
            <Text as="p" fontWeight="medium">
              Discount Value
            </Text>
            <InlineStack blockAlign="start" wrap={false} gap={300} align="start">
              <PressedButtonFixedPercentage
                discount={discount}
                setDiscount={setDiscount}
              />
              <div style={{ flexGrow: "1" }}>
                <TextField
                  type="number"
                  inputMode="decimal"
                  autoComplete="off"
                  error={errors.value}
                  selectTextOnFocus
                  prefix={discount.type == "fixed_amount" ? currency : ""}
                  suffix={discount.type == "percentage" ? "%" : ""}
                  value={discount.value ? discount.value : ""}
                  onChange={(value) => {setDiscount({...discount, value: value})}}
                />
              </div>
            </InlineStack>
          </BlockStack>
        <BlockStack gap="200">
          <Text as="p" fontWeight="medium">
            Applies to
          </Text>
          <ChoiceList
            choices={[
              { label: "Specific products", value: "products" },
              { label: "Specific collections", value: "collections" },
            ]}
            selected={discount.applies_to}
            onChange={(value) => {setDiscount({ ...discount, applies_to: value[0] })}
            }
            titleHidden={true}
          />
        </BlockStack>
        <Box>
          <InlineStack blockAlign="start" wrap={false} gap={100} align="start">
            <div style={{ flexGrow: "1" }}>
              <TextField
                placeholder={"Search " + discount.applies_to}
                autoComplete="off"
                prefix={<Icon source={SearchIcon} />}
                onChange={(value) => {
									if (formState.applies_to === "products") {
										selectProduct();
									} else {
										selectCollection();
									}
								}}
                error={errors.product_required}
              />
            </div>
            {discount.applies_to === "products"
                    ? <Button size="large" onClick={selectProduct}>Browse</Button>
                    : <Button size="large" onClick={selectCollection}>Browse</Button>
            }
          </InlineStack>
          {
            (discount.applies_to === "products" && discount.selected_products.length > 0) ||
            (discount.applies_to === "collections" && discount.selected_collections.length > 0) 
              ? 
              <div style={{marginTop: "20px"}}>
                  <Card>
                    <Bleed marginInline="400" marginBlock="400">
                    <ResourceList
                      resourceName={{singular: 'product', plural: 'products'}}
                      items={discount.applies_to === "products"
                              ? discount.selected_products
                              : discount.selected_collections
                            }
                      renderItem={(item, items) => {
                        const {title, hasOnlyDefaultVariant, variants} = item;
                        const isLastItem = items.indexOf(item) === items.length - 1;

                        return (
                              <div>
                              <Box padding="300">
                                <InlineStack align='space-between' blockAlign='center'>
                                  <InlineStack gap="200">
                                    <Thumbnail
                                      size="small"
                                      source={discount.applies_to === "products"
                                        ? (item.images[0]
                                            ? item.images[0].originalSrc
                                            : ImageIcon)
                                        : (item.image
                                          ? item.image.originalSrc
                                          : ImageIcon)
                                      }
                                    />
                                    {discount.applies_to === "products"
                                      ?
                                        <BlockStack>
                                          <Text variant="bodyMd" as="p">
                                            {title}
                                          </Text>
                                          {
                                            !hasOnlyDefaultVariant
                                            ? <Text variant="bodyMd" as="p" tone="subdued">
                                                {`(${variants.length} variants selected)`}
                                              </Text>
                                            : null
                                          }
                                        </BlockStack>
                                      :
                                        <Text variant="bodyMd" as="p">
                                          {title}
                                        </Text>
                                    }
                                  </InlineStack>
                                  <InlineStack blockAlign='baseline'>
                                    <Box>
                                      <Bleed>
                                        <div
                                          onMouseOver={() => setHoveredRow(item)}
                                          onMouseLeave={() => setHoveredRow(null)}
                                          onClick={() => {
                                            if (discount.applies_to === "products") {
                                              const index = discount.selected_products.indexOf(item);
                                              const new_selected_products = [...discount.selected_products];
                                              new_selected_products.splice(index, 1);
                                              setDiscount({ ...discount, selected_products: new_selected_products });
                                            } else {
                                              const index = discount.selected_collections.indexOf(item);
                                              const new_selected_collections = [...discount.selected_collections];
                                              new_selected_collections.splice(index, 1);
                                              setDiscount({ ...discount, selected_collections: new_selected_collections });
                                            }
                                          }}
                                          style={{cursor: "pointer"}}
                                        >
                                        <Icon
                                          source={XIcon}
                                          tone={hoveredRow === item ? 'primary' : 'subdued'}
                                        />
                                        </div>
                                      </Bleed>
                                    </Box>
                                  </InlineStack>
                                </InlineStack>
                              </Box>
                              {!isLastItem && <Divider />}
                              </div>
                          );
                        }}
                    />
                    </Bleed>
                  </Card>
                </div>
              : null
          }
          
        </Box>
      </BlockStack>
    </Card>
  );
}

export default SelectProduct;