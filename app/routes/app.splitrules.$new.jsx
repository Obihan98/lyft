// Components
import Description from "../components/Split/Description.jsx";
import ErrorsBanner from "../components/Split/ErrorsBanner.jsx";
import TypeRule from "../components/Split/TypeRule.jsx";
import MaximumItems from "../components/Split/MaximumItems.jsx";
import Summary from "../components/Split/Summary.jsx";

// Server APIs
import { extractLocations, getGroups } from "../models/shopify.extract.server.js";
import { getShopData } from "../models/shopify.query.server.js";
import { insertSplit } from "../models/db.connection.server.js";

// Static Variables
import { CURRENCY_CODES } from '../components/Utility/currencyCodes.js';

// Imports
import {
  Page,
  Layout
} from "@shopify/polaris";

import { useState, useEffect } from "react";
import { authenticate } from "../shopify.server.js";
import { useLoaderData, useNavigate, useFetcher } from "@remix-run/react";

export async function loader({ request, params }) {
  const { admin, session, billing  } = await authenticate.admin(request);

  const locations = await extractLocations(admin)
  const shopData = await getShopData(admin)

  return { locations: locations, currency: CURRENCY_CODES[shopData.currencyCode], shopWeightUnit: shopData.weightUnit}
}

export async function action({ request, params }) {
	const { admin, session } = await authenticate.admin(request);
  const { shop } = session;
  
  const requestData = await request.json()
	if (requestData.purpose === "getGroups") {
    const data = await getGroups(admin, requestData.type)
    return { groups: data };
  }
  if (requestData.purpose === "insertSplit") {
    const data = await insertSplit(shop, requestData.split)
    return null;
  } 

  return null
}

export default function SplitRules() {
  const navigate = useNavigate()
  
  const loaderData = useLoaderData();
  const { locations = [], currency, shopWeightUnit } = loaderData;

  const [split, setSplit] = useState({
    title: "",
    groupBy: "location",
    all: false,
    selectedGroup: "",
    limit: 'none',
    limitValue: '10'
  });

  const [errors, setErrors] = useState({
    title: "",
    groupBy: "",
    all: "",
    selectedGroup: "",
  });

  useEffect(() => {console.log(split)}, [split]);

  const [autoCompleteSelected, setAutoCompleteSelected] = useState([]);
	const [autoCompleteInputValue, setAutoCompleteInputValue] = useState('');

  const [displayErrors, setDisplayErrors] = useState(false);
  useEffect(() => {const allErrorsEmpty = Object.values(errors).every(value => value.length < 1); setDisplayErrors(!allErrorsEmpty);}, [errors]);

  const fetcher = useFetcher();
  const handleSaveClick = () => {
    let hasError = false;

    setErrors((prev) => {
      const newErrors = {
        // title: split.title.length >= 5 ? "" : "Title must be at least 5 characters",
        // value: split.value > 0 ? "" : "Discount value must be larger than 0",
      };
      hasError = Object.values(newErrors).some((err) => err);
      return newErrors;
    });

    if (hasError) {
      setDisplayErrors(true)
    } else {
      fetcher.submit(
        { split: split, purpose: 'insertSplit' },
        { method: "post", encType: "application/json" }
      );
      shopify.saveBar.hide('split-save-bar');
      shopify.toast.show('Split rule created', {duration: 5000,});
      navigate("/app");
    }
  };
  
  const handleDiscardClick = () => {
    shopify.saveBar.hide('split-save-bar');
    setSplit({
      title: "",
      groupBy: "location",
      all: false,
      selectedGroup: "",
      limit: 'none',
      limitValue: '10'
    });
    setErrors({
      title: "",
      value: "",
      selectedGroup: ""
    });
    setAutoCompleteSelected([]);
    setAutoCompleteInputValue('');
  };

  async function handleBackClick() {
    await shopify.saveBar.leaveConfirmation();
    navigate("/app");
  }

  return (
    <div>
    <ui-save-bar id="split-save-bar">
      <button variant="primary" onClick={handleSaveClick}></button>
      <button onClick={handleDiscardClick}></button>
    </ui-save-bar>
    <Page
      backAction={{onAction: handleBackClick}}
      title="Create split rule"
      compactTitle
    >
      <Layout>
        <Layout.Section>
          {displayErrors
          ?
            <Layout.Section>
              <ErrorsBanner
                errors={errors} 
                setErrors={setErrors} 
              />
            </Layout.Section>
          : null}
          <Layout.Section>
            <Description
              header={"Description"}
              split={split} 
              setSplit={setSplit} 
              errors={errors} 
              setErrors={setErrors} 
            />
          </Layout.Section>
          <Layout.Section>
            <TypeRule
              split={split} 
              setSplit={setSplit} 
              errors={errors} 
              setErrors={setErrors} 
              locations={locations}
              autoCompleteSelected={autoCompleteSelected}
              setAutoCompleteSelected={setAutoCompleteSelected}
              autoCompleteInputValue={autoCompleteInputValue}
              setAutoCompleteInputValue={setAutoCompleteInputValue}
            />
          </Layout.Section>
          <Layout.Section>
            <MaximumItems
              split={split} 
              setSplit={setSplit} 
              errors={errors} 
              setErrors={setErrors} 
              currency={currency}
              shopWeightUnit={shopWeightUnit}
            />
          </Layout.Section>
          <Layout.Section>
          </Layout.Section>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Layout.Section>
            <Summary 
              split={split} 
              currency={currency}
              shopWeightUnit={shopWeightUnit}
            />
          </Layout.Section>
        </Layout.Section>
      </Layout>
    </Page>
    </div>
  );
}