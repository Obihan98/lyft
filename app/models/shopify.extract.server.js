import { getShopLocations, getProductTypes, getProductVendors, getProductSKUs } from "./shopify.query.server.js";

export async function extractLocations(admin) {
  try {
    let hasNextPage = true;
    let afterCursor = null;
    let locationsList = [];

    while (hasNextPage) {
      const result = await getShopLocations(admin);

			result.edges.forEach(edge => {locationsList.push({
				value: edge.node.name, // Ensure it's a string
				label: edge.node.name, // Use correct property
			});});

      hasNextPage = result.pageInfo.hasNextPage;
      afterCursor = result.pageInfo.endCursor;
    }

    return locationsList;
  } catch (error) {
    console.error('Error extracting shop locations:', error);
    return [];
  }
}

export async function extractProductTypes(admin) {
  try {
    let hasNextPage = true;
    let afterCursor = null;
    let typeSet = new Set();

    while (hasNextPage) {
      const result = await getProductTypes(admin); // Fixed typo in function name

      result.edges.forEach(edge => {
        if (edge.node.productType && edge.node.productType.length > 0) {
          typeSet.add(edge.node.productType); // Store only unique strings
        }
      });

      hasNextPage = result.pageInfo.hasNextPage;
      afterCursor = result.pageInfo.endCursor;
    }
		
    // Convert Set back to an array of objects
    return Array.from(typeSet).map(productType => ({
      value: productType,
      label: productType,
    }));
  } catch (error) {
    console.error('Error extracting product types:', error);
    return [];
  }
}

export async function extractProductVendors(admin) {
  try {
    let hasNextPage = true;
    let afterCursor = null;
    let vendorSet = new Set();

    while (hasNextPage) {
      const result = await getProductVendors(admin);

      result.edges.forEach(edge => {
        if (edge.node.vendor && edge.node.vendor.length > 0) {
          vendorSet.add(edge.node.vendor); // Store only unique strings
        }
      });

      hasNextPage = result.pageInfo.hasNextPage;
      afterCursor = result.pageInfo.endCursor;
    }

    // Convert Set back to an array of objects
    return Array.from(vendorSet).map(vendor => ({
      value: vendor,
      label: vendor,
    }));
  } catch (error) {
    console.error('Error extracting product vendors:', error);
    return [];
  }
}

export async function extractProductSKUs(admin) {
  try {
    let hasNextPage = true;
    let afterCursor = null;
    let variantsSet = new Set();

    while (hasNextPage) {
      const result = await getProductSKUs(admin);

      result.edges.forEach(productEdge => {
        productEdge.node.variants.edges.forEach(variantEdge => {
          const sku = variantEdge.node.sku;
          if (sku && sku.length > 0) {
            variantsSet.add(sku); // Store only unique SKUs
          }
        });
      });

      hasNextPage = result.pageInfo.hasNextPage;
      afterCursor = result.pageInfo.endCursor;
    }

    // Convert Set back to an array of objects
    return Array.from(variantsSet).map(sku => ({
      value: sku,
      label: sku,
    }));
  } catch (error) {
    console.error('Error extracting product SKUs:', error);
    return [];
  }
}

export async function getGroups(admin, groupBy) {
	try {
		if (groupBy == 'type') return extractProductTypes(admin);
		if (groupBy == 'location') return extractLocations(admin);
		if (groupBy == 'vendor') return extractProductVendors(admin);
		if (groupBy == 'sku') return extractProductSKUs(admin);

  } catch (error) {
    console.error('Error extracting product types:', error);
    return [];
  }
}