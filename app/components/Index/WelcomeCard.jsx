import {
CalloutCard
} from "@shopify/polaris";

function WelcomeCard(props) {
  const { setNewDiscountModalActive } = props;

  return (
    <CalloutCard
      title="Automatically split orders based on custom rules"
      illustration="https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/empty-state-finances-CwlxKNKOUfAf.svg"
      primaryAction={{
        content: 'Create split rule',
        url: '/app/splitrules/new'
      }}
    >
      <p>Easily split orders into parent and child orders to streamline fulfillment, improve order management, and automate processing.</p>
    </CalloutCard>
  );
}

export default WelcomeCard;