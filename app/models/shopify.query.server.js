export async function getShopData(admin) {
  const data = await admin.graphql(
    `#graphql
    query {
      shop {
        currencyCode
        weightUnit
      }
    }`,
  );
  const parsedResponse = await data.json();  
  return parsedResponse.data.shop
}

export async function getShopLocations(admin) {
  const data = await admin.graphql(
    `#graphql
    query {
      locations(first: 250) {
        edges {
          node {
            id
            name
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }`,
  );
  const response = await data.json(); 
  // console.log(JSON.stringify(response, null, 2));
  return response.data.locations
}

export async function getProductTypes(admin) {
  const data = await admin.graphql(
    `#graphql
    query {
      products(first: 250) {
        edges {
          node {
            productType
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }`,
  );
  const response = await data.json(); 
  // console.log(JSON.stringify(response, null, 2));
  return response.data.products
}

export async function getProductVendors(admin) {
  const data = await admin.graphql(
    `#graphql
    query {
      products(first: 250) {
        edges {
          node {
            vendor
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }`,
  );
  const response = await data.json(); 
  // console.log(JSON.stringify(response, null, 2));
  return response.data.products
}

export async function getProductSKUs(admin) {
  const data = await admin.graphql(
    `#graphql
    query {
      products(first: 250) {
        edges {
          node {
            variants(first: 250) {
              edges {
                node {
                  sku
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }`,
  );
  const response = await data.json(); 
  // console.log(JSON.stringify(response, null, 2));
  return response.data.products
}