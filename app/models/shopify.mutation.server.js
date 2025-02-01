export async function createDiscount(admin, discount) {
	try {
		const response = await admin.graphql(
			`#graphql
			mutation discountAutomaticAppCreate($automaticAppDiscount: DiscountAutomaticAppInput!) {
				discountAutomaticAppCreate(automaticAppDiscount: $automaticAppDiscount) {
					userErrors {
						field
						message
					}
				}
			}`,
			{
				variables: {
					"automaticAppDiscount": {
						"title": discount.title,
						"functionId": "de7a6b74-5ac7-432f-8d5b-98dd14fb8af5",
						"startsAt": discount.starts_at,
						"endsAt": discount.ends_at,
						"combinesWith": {
							"orderDiscounts": discount.combine_order,
							"productDiscounts": discount.combine_product,
							"shippingDiscounts": discount.combine_shipping
						},
						"metafields": [
							{
								"namespace": "default",
								"key": "function-configuration",
								"type": "json",
								"value": JSON.stringify({
									discount: {
										value: discount.value,
										type: discount.type
									} 
								})
							}
						]
					}
				},
			},
		);
		const parsedResponse = await response.json(); 
		console.log(JSON.stringify(parsedResponse.data, null, 2));
		return parsedResponse
	} catch (error) {
		console.error("Create Discount Error -> ", error);
	}
}