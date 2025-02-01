import WelcomeCard from "../components/Index/WelcomeCard";
import NewDiscountModal from "../components/Index/NewDiscountModal";

import { authenticate } from "../shopify.server";

import {
  Page,
  Layout,
} from "@shopify/polaris";

import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  return null;
};

export default function Index() {
  const shopify = useAppBridge();

  const [newDiscountModalActive, setNewDiscountModalActive] = useState(false);

  return (
    <div>
      <Page
        title="Lyft"
        primaryAction={{content: 'Create a discount', onAction: () => setNewDiscountModalActive(true)}}
        narrowWidth={true}
      >
        <Layout>
          <Layout.Section>
            <WelcomeCard setNewDiscountModalActive={setNewDiscountModalActive}/>
          </Layout.Section>
          <Layout.Section>
          </Layout.Section>
          <Layout.Section>
          </Layout.Section>
        <Layout.Section></Layout.Section>
        </Layout>
      </Page>
      {
        newDiscountModalActive
        ? <NewDiscountModal newDiscountModalActive={newDiscountModalActive} setNewDiscountModalActive={setNewDiscountModalActive}/>
        : null
      }
    </div>
  );
}
