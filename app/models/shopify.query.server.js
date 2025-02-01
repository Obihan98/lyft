export async function getShopCurrency(admin) {
  const data = await admin.graphql(
    `#graphql
    query {
      shop {
        currencyCode
      }
    }`,
  );
  const parsedResponse = await data.json();  
  return parsedResponse.data.shop.currencyCode
}