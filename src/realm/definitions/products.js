export const Products = {
  name: 'Products',
  properties: {
    CompanyId: 'int',
		productId: 'int',
		name: { type: 'string', indexed: true },
		price: 'float?',
  }
};