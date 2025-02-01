import {
  Card,
  InlineStack,
  ButtonGroup,
  Button,
  TextField,
  Banner,
  BlockStack
} from "@shopify/polaris";

import { useState } from "react";

function ErrorsBanner({errors, setErrors}) {
  return (
    <Banner
      title="There are errors with this discount"
      tone="critical"
      action={{content: 'Contact support', onAction: () => {window.tidioChatApi.open();}}}
    >
      <BlockStack>
      <p>
        Please correct the errors in the fields below before submitting. If you need assistance, chat with Dyno support!
      </p>
      <ul style={{marginBlockEnd: '8px'}}>
        {Object.values(errors).map((error, index) => {
          // Check if the error message is not empty
          return error ? <li key={index}>{error}</li> : null;
        })}
      </ul>
      </BlockStack>
    </Banner>
  );
}

export default ErrorsBanner;