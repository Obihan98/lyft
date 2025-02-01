import {
CalloutCard
} from "@shopify/polaris";

function WelcomeCard(props) {
  const { setNewDiscountModalActive } = props;

  return (
    <CalloutCard
      title="Get discounts applied at checkout on a customer's first order."
      illustration="https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/empty-state-discount-IqX-GiQmgbHG.svg"
      primaryAction={{
        content: 'Create a discount',
        onAction: () => setNewDiscountModalActive(true)
      }}
    >
      <p>Apply discounts at checkout for first-time customers by verifying unused phone numbers or email addresses.</p>
    </CalloutCard>
  );
}

export default WelcomeCard;