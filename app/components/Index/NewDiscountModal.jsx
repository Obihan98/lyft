import React  from 'react';

import {
  Modal,
  ResourceList,
  ResourceItem,
  Box,
  InlineStack,
  Icon,
  Text,
  Bleed,
  BlockStack,
} from '@shopify/polaris';

import {
  ChevronRightIcon,
} from '@shopify/polaris-icons';


function NewDiscountModal(props) {
  const { newDiscountModalActive, setNewDiscountModalActive } = props;

  return (
    <div style={{height: '400px'}}>
      <Modal
        open={newDiscountModalActive}
        onClose={() => setNewDiscountModalActive(false)}
        title="Select discount type"
        primaryAction={{
          content: 'Cancel',
          onAction: () => setNewDiscountModalActive(false),
        }}
      >
        
        <Modal.Section>
          <Bleed marginInline="400" marginBlock="400">
            <ResourceList
              resourceName={{singular: 'customer', plural: 'customers'}}
              items={[
                {
                  url: '/app/discount/product/new',
                  name: 'Amount off products',
                  location: 'Discount specific products or collections of products on first order.',
                },
                {
                  url: '/app/discount/order/new',
                  name: 'Amount off order',
                  location: 'Discount the total order amount on first order.',
                },
                {
                  url: '/app/discount/freeshipping/new',
                  name: 'Free shipping',
                  location: 'Offer free shipping on first order.',
                },
              ]}
              renderItem={(item) => {
                const {url, name, location} = item;

                return (
                      <ResourceItem
                        url={url}
                        name={name}
                        ariaExpanded={false}
                      >
                        <InlineStack align='space-between' blockAlign='center'>
                          <BlockStack gap="150">
                            <Text as="p" variant="bodyMd" fontWeight="regular">
                              {name}
                            </Text>
                            <Text as="p" variant="bodySm" fontWeight="regular" tone="subdued">
                              {location}
                            </Text>
                          </BlockStack >
                          <InlineStack blockAlign='baseline'>
                            <Box>
                              <Icon
                                source={ChevronRightIcon}
                                tone="subdued"
                              />
                            </Box>
                          </InlineStack>
                        </InlineStack>
                      </ResourceItem>
                    
                  );
                }}
              />
            </Bleed>
          </Modal.Section>
      </Modal>
    </div>
  );
}

export default NewDiscountModal;