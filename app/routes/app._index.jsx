import WelcomeCard from "../components/Index/WelcomeCard";
import EmptySplitRules from "../components/Index/EmptySplitRules";

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
        primaryAction={{content: 'Create split rule', url: '/app/splitrules/new'}}
        narrowWidth={true}
      >
        <Layout>
          <Layout.Section>
            <WelcomeCard/>
          </Layout.Section>
          <Layout.Section>
            <EmptySplitRules/>
          </Layout.Section>
          <Layout.Section>
          </Layout.Section>
        <Layout.Section></Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
