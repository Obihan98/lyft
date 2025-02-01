// Components
import Description from "../components/Discount/Description.jsx";
import Value from "../components/Discount/Value.jsx";
import CombinesWith from "../components/Discount/CombinesWith.jsx";
import DateSelection from "../components/Discount/DateSelection.jsx";
import ErrorsBanner from "../components/Discount/ErrorsBanner.jsx";
import Summary from "../components/Discount/Summary.jsx";

// Server APIs
import { getShopCurrency } from "../models/shopify.query.server.js";
import { createDiscount } from "../models/shopify.mutation.server.js";

// Static Variables
import { CURRENCY_CODES } from '../components/Utility/currencyCodes.js';

// Imports
import {
  Page,
  Layout
} from "@shopify/polaris";

import { useState, useEffect } from "react";
import { authenticate } from "../shopify.server.js";
import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";

export async function loader({ request, params }) {
  const { admin, session, billing  } = await authenticate.admin(request);

  const currency = await getShopCurrency(admin)

  return { currency: CURRENCY_CODES[currency] }
}

export async function action({ request, params }) {
  const { admin, session } = await authenticate.admin(request);
  const { shop } = session;

  const submitData = await request.json()
  const response = createDiscount(admin, submitData.discount)
  return null;
}

export default function Discount() {
  const navigate = useNavigate()
  const submit = useSubmit();
  
  const loaderData = useLoaderData();
  const { currency } = loaderData;

  const today = new Date(Date.now())
  const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));

  const [discount, setDiscount] = useState({
    title: "",
    type: "fixed_amount",
    value: 10,
    combine_product: false,
    combine_order: false,
    combine_shipping: false,
    endDateIsSet: false,
    starts_at: today.toISOString(),
    ends_at: nextMonth.toISOString(),
  });
  const [errors, setErrors] = useState({
    title: "",
    value: ""
  });
  const [displayErrors, setDisplayErrors] = useState(false);

  useEffect(() => {const allErrorsEmpty = Object.values(errors).every(value => value.length < 1); setDisplayErrors(!allErrorsEmpty);}, [errors]);

  const handleSaveClick = () => {
    let hasError = false;

    setErrors((prev) => {
      const newErrors = {
        title: discount.title.length >= 5 ? "" : "Title must be at least 5 characters",
        value: discount.value > 0 ? "" : "Discount value must be larger than 0",
      };
      hasError = Object.values(newErrors).some((err) => err);
      return newErrors;
    });

    if (hasError) {
      setDisplayErrors(true)
    } else {
      submit({discount: discount}, {method: "post", encType: "application/json"});
      shopify.saveBar.hide('discount-save-bar');
      shopify.toast.show('Discount created', {duration: 5000,});
      navigate("/app");
    }
  };
  
  const handleDiscardClick = () => {
    shopify.saveBar.hide('discount-save-bar');
    setDiscount({
      title: "",
      type: "fixed_amount",
      value: 10,
      combine_product: false,
      combine_order: false,
      combine_shipping: false,
      endDateIsSet: false,
      starts_at: today.toISOString(),
      ends_at: nextMonth.toISOString(),
    });
    setErrors({
      title: "",
      value: ""
    });
  };

  async function handleBackClick() {
    await shopify.saveBar.leaveConfirmation();
    navigate("/app");
  }

  return (
    <div>
    <ui-save-bar id="discount-save-bar">
      <button variant="primary" onClick={handleSaveClick}></button>
      <button onClick={handleDiscardClick}></button>
    </ui-save-bar>
    <Page
      backAction={{onAction: handleBackClick}}
      title="Create a first-time customer discount"
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
              header='Amount off order'
              discount={discount} 
              setDiscount={setDiscount} 
              errors={errors} 
              setErrors={setErrors} 
            />
          </Layout.Section>
          <Layout.Section>
            <Value 
              discount={discount} 
              setDiscount={setDiscount} 
              errors={errors} 
              setErrors={setErrors} 
              currency={currency} 
            />
          </Layout.Section>
          <Layout.Section></Layout.Section>
          <Layout.Section>
            <CombinesWith 
              discount={discount} 
              setDiscount={setDiscount} 
              errors={errors} 
              setErrors={setErrors} 
            />
          </Layout.Section>
          <Layout.Section>
            <DateSelection 
              discount={discount} 
              setDiscount={setDiscount} 
              errors={errors} 
              setErrors={setErrors} 
            />
          </Layout.Section>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Layout.Section>
            <Summary 
              discount={discount} 
            />
          </Layout.Section>
        </Layout.Section>
      </Layout>
    </Page>
    </div>
  );
}